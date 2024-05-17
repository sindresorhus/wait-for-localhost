import test from 'ava';
import delay from 'delay';
import createTestServer from 'create-test-server';
import waitForLocalhost from './index.js';

test('main', async t => {
	t.plan(2);

	const server = await createTestServer();
	server.head('/', async (request, response) => {
		await delay(1000);
		response.end();
		t.pass();
	});

	await waitForLocalhost({port: server.port});

	t.pass();

	await server.close();
});

test('use get method', async t => {
	t.plan(2);

	const server = await createTestServer();
	server.get('/', async (request, response) => {
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

test('use custom path', async t => {
	t.plan(2);

	const server = await createTestServer();
	server.get('/health', async (request, response) => {
		await delay(1000);
		response.end();
		t.pass();
	});

	await waitForLocalhost({
		port: server.port,
		path: '/health',
	});

	t.pass();

	await server.close();
});

test('use custom statusCode', async t => {
	t.plan(2);

	const server = await createTestServer();
	server.get('/', async (request, response) => {
		await delay(1000);
		response.status(201).end();
		t.pass();
	});

	await waitForLocalhost({
		port: server.port,
		statusCode: 201,
	});

	t.pass();

	await server.close();
});

test('use custom statusCode list', async t => {
	t.plan(2);

	const server = await createTestServer();
	server.get('/', async (request, response) => {
		await delay(1000);
		response.status(202).end();
		t.pass();
	});

	await waitForLocalhost({
		port: server.port,
		statusCode: [201, 202],
	});

	t.pass();

	await server.close();
});

