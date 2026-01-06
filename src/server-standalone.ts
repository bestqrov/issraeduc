import app from './app';
import { env } from './config/env';
import prisma from './config/database';

const startServer = async () => {
    try {
        // Test database connection
        await prisma.$connect();
        console.log('✅ Database connected successfully');

        // Determine port - use 4000 for backend (matches frontend next.config.js)
        const port = 4000;

        // Start server and keep reference for shutdown
        const server = app.listen(port, () => {
            console.log(`🚀 Backend API Server is running on port ${port}`);
            console.log(`📍 Environment: ${env.NODE_ENV}`);
            console.log(`🔗 Health check: http://localhost:${port}/health`);
            console.log(`🔗 API Base URL: http://localhost:${port}/api`);
            console.log('\n📚 Available API routes:');
            console.log('   POST   /api/auth/login');
            console.log('   POST   /api/users (ADMIN)');
            console.log('   GET    /api/users (ADMIN)');
            console.log('   GET    /api/students (ADMIN, SECRETARY)');
            console.log('   GET    /api/inscriptions (ADMIN, SECRETARY)');
            console.log('   GET    /api/payments (ADMIN)');
            console.log('   GET    /api/settings (ADMIN)');
            console.log('   GET    /api/transactions (ADMIN)');
            console.log('   GET    /api/teachers');
            console.log('   GET    /api/parents');
        });

        // Graceful shutdown helper
        const gracefulShutdown = async (exitCode = 0) => {
            console.log('\n🛑 Shutting down gracefully...');

            // Stop accepting new connections
            if (server && typeof server.close === 'function') {
                await new Promise<void>((resolve) => {
                    server.close((err?: Error) => {
                        if (err) console.error('Error closing server:', err);
                        resolve();
                    });
                });
                console.log('HTTP server closed');
            }

            // Disconnect Prisma
            try {
                await prisma.$disconnect();
                console.log('Prisma disconnected');
            } catch (e) {
                console.error('Error disconnecting Prisma:', e);
            }

            // Force exit if something hangs
            setTimeout(() => {
                console.warn('Forcing shutdown');
                process.exit(1);
            }, 10000).unref();

            process.exit(exitCode);
        };

        // Signals and unexpected errors
        process.on('SIGINT', () => gracefulShutdown(0));
        process.on('SIGTERM', () => gracefulShutdown(0));
        process.on('unhandledRejection', (reason) => {
            console.error('Unhandled Rejection:', reason);
            void gracefulShutdown(1);
        });
        process.on('uncaughtException', (err) => {
            console.error('Uncaught Exception:', err);
            void gracefulShutdown(1);
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
