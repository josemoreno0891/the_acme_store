const { client } = require('./db');

const init = async () => {
    await client.connect();
    console.log('connected to database');
    await createTables();
    console.log('tables created');

    const [moe, lucy, ethyl, singing, dancing, juggling, plateSpinning] = await Promise.all([
        createUser({ username: 'moe', password: 's3cr3t' }),
        createUser({ username: 'lucy', password: 's3cr3t!!' }),
        createUser({ username: 'ethyl', password: 'shhh' }),
        createFavorite({ name: 'singing' }),
        createFavorite({ name: 'dancing' }),
        createFavorite({ name: 'juggling' }),
        createFavorite({ name: 'plate spinning' }),
    ]);
    console.log(moe.id);
    console.log(dancing.id)

    const users = await fetchUsers();
    console.log(users);

    const skills = await fetchFavorite();
    console.log(skills);
}
init();