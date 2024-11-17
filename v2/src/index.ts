// index.ts
import prisma from './models/prismaClient';
import app from './app';

const PORT = process.env.PORT || 3000;

prisma.$connect()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => {
        console.error('Failed to connect to database:', error);
        process.exit(1);
    });

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
