import { promisify } from "node:util";
import http2 from "node:http2";
import test from "ava";
import delay from "delay";
import createTestServer from "create-test-server";
import waitForLocalhost from "./index.js";

test("main", async (t) => {
	t.plan(2);

	const server = await createTestServer();
	server.head("/", async (request, response) => {
		await delay(1000);
		response.end();
		t.pass();
	});

	await waitForLocalhost({ port: server.port });

	t.pass();

	await server.close();
});

test("use get method", async (t) => {
	t.plan(2);

	const server = await createTestServer();
	server.get("/", async (request, response) => {
		await delay(1000);
		response.end();
		t.pass();
	});

	await waitForLocalhost({
		port: server.port,
		useGet: true,
	});

	t.pass();

	await server.close();
});

test("use custom path", async (t) => {
	t.plan(2);

	const server = await createTestServer();
	server.get("/health", async (request, response) => {
		await delay(1000);
		response.end();
		t.pass();
	});

	await waitForLocalhost({
		port: server.port,
		path: "/health",
	});

	t.pass();

	await server.close();
});

test("use custom statusCodes", async (t) => {
	t.plan(2);

	const server = await createTestServer();
	server.get("/", async (request, response) => {
		await delay(1000);
		response.status(202).end();
		t.pass();
	});

	await waitForLocalhost({
		port: server.port,
		statusCodes: [201, 202],
	});

	t.pass();

	await server.close();
});

test("should handle HTTP/2-only server with fallback", async (t) => {
	const server = http2.createServer();

	server.on("stream", (stream, headers) => {
		if (headers[":method"] === "HEAD") {
			stream.respond({ ":status": 200 });
			stream.end();
		}
	});

	await promisify(server.listen.bind(server))(0);
	const { port } = server.address();

	const result = await waitForLocalhost({ port });
	t.truthy(result);
	t.true([4, 6].includes(result.ipVersion));

	server.close();
});

test("should handle HTTP/2-only server with custom status codes", async (t) => {
	const server = http2.createServer();

	server.on("stream", (stream, headers) => {
		if (headers[":method"] === "HEAD") {
			stream.respond({ ":status": 202 });
			stream.end();
		}
	});

	await promisify(server.listen.bind(server))(0);
	const { port } = server.address();

	const result = await waitForLocalhost({
		port,
		statusCodes: [202],
	});
	t.truthy(result);

	server.close();
});

test("should handle HTTP/2-only server with GET method", async (t) => {
	const server = http2.createServer();

	server.on("stream", (stream, headers) => {
		if (headers[":method"] === "GET") {
			stream.respond({ ":status": 200 });
			stream.end("OK");
		}
	});

	await promisify(server.listen.bind(server))(0);
	const { port } = server.address();

	const result = await waitForLocalhost({
		port,
		useGet: true,
	});
	t.truthy(result);

	server.close();
});

test("should handle HTTP/2-only server with custom path", async (t) => {
	const server = http2.createServer();

	server.on("stream", (stream, headers) => {
		if (headers[":path"] === "/health" && headers[":method"] === "HEAD") {
			stream.respond({ ":status": 200 });
			stream.end();
		}
	});

	await promisify(server.listen.bind(server))(0);
	const { port } = server.address();

	const result = await waitForLocalhost({
		port,
		path: "/health",
	});
	t.truthy(result);

	server.close();
});

test("should support AbortSignal.timeout()", async (t) => {
	const startTime = Date.now();

	try {
		await waitForLocalhost({
			port: 9999, // Non-existent server
			signal: AbortSignal.timeout(500),
		});
		t.fail("Should have timed out");
	} catch (error) {
		const elapsed = Date.now() - startTime;
		t.true(elapsed >= 500, "Should timeout after 500ms");
		t.true(elapsed < 700, "Should timeout close to 500ms");
		t.is(error.name, "TimeoutError");
	}
});

test("should not loop on error", async (t) => {
	t.timeout(40_000);
	try {
		await waitForLocalhost({
			port: 5879,
			signal: AbortSignal.timeout(30_000),
			path: "/json/list",
			useGet: true,
		});
		t.fail("should have timeout out");
	} catch (error) {
		t.is(error.name, "TimeoutError");
	}
});
