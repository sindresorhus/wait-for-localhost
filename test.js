import test from 'ava';
import execa from 'execa';
import delay from 'delay';
import createTestServer from 'create-test-server';

test('main', async t => {
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
