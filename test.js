import test from 'ava';
import execa from 'execa';
import delay from 'delay';
import createTestServer from 'create-test-server';
import waitForLocalhost from '.';

test('api', async t => {
	t.plan(2);

	const server = await createTestServer();
	server.head('/', async (request, response) => {
		await delay(1000);
		response.end();
		t.pass();
	});

	await waitForLocalhost(server.port);

	t.pass();

	await server.close();
});

test('cli', async t => {
	t.plan(2);

	const server = await createTestServer();
	server.head('/', async (request, response) => {
		await delay(1000);
		response.end();
		t.pass();
	});

	await execa('./cli.js', [server.port]);

	t.pass();

	await server.close();
});
