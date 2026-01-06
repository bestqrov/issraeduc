import app from './app';
import { env } from './config/env';
import prisma from './config/database';
import next from 'next';
import path from 'path';

const startServer = async () => {
    try {
        // Initialize Next.js
        const dev = process.env.NODE_ENV !== 'production';
        const nextApp = next({
            dev,
            dir: path.resolve(__dirname, '../frontend')
        });
        const handle = nextApp.getRequestHandler();

        console.log('⏳ Preparing Next.js...');
        await nextApp.prepare();
        console.log('✅ Next.js prepared');

        // Handle all other routes with Next.js (Frontend)
        app.all('*', (req, res) => {
            return handle(req, res);
        });

        // Test database connection
        await prisma.$connect();
        console.log('✅ Database connected successfully');

        // Determine port with a safe default
        const port = Number(env.PORT) || 3000;
        // Start server and keep reference for shutdown
        const server = app.listen(port, '0.0.0.0', () => {
            console.log(`🚀 Server is running on port ${port}`);
            console.log(`📍 Environment: ${env.NODE_ENV}`);
            console.log(`🔗 Health check: http://localhost:${port}/health`);
            console.log('\n📚 Available routes:');
            console.log(`   GET    /      (Redirect to: ${env.FRONTEND_URL})`);
            console.log('   POST   /auth/login');
            console.log('   POST   /users (ADMIN)');
            console.log('   GET    /users (ADMIN)');
            console.log('   GET    /users/:id (ADMIN)');
            console.log('   PUT    /users/:id (ADMIN)');
            console.log('   DELETE /users/:id (ADMIN)');
            console.log('   POST   /students (ADMIN, SECRETARY)');
            console.log('   GET    /students (ADMIN, SECRETARY)');
            console.log('   GET    /students/:id (ADMIN, SECRETARY)');
            console.log('   PUT    /students/:id (ADMIN, SECRETARY)');
            console.log('   DELETE /students/:id (ADMIN, SECRETARY)');
            console.log('   POST   /inscriptions (ADMIN, SECRETARY)');
            console.log('   GET    /inscriptions (ADMIN, SECRETARY)');
            console.log('   GET    /inscriptions/:id (ADMIN, SECRETARY)');
            console.log('   PUT    /inscriptions/:id (ADMIN, SECRETARY)');
            console.log('   DELETE /inscriptions/:id (ADMIN, SECRETARY)');
            console.log('   POST   /payments (ADMIN)');
            console.log('   GET    /payments (ADMIN)');
            console.log('   GET    /payments/:id (ADMIN)');
            console.log('   POST   /attendance (ADMIN)');
            console.log('   GET    /attendance/student/:id (ADMIN)');
            console.log('   GET    /settings (ADMIN)');
            console.log('   PUT    /settings (ADMIN)');
            console.log('   GET    /transactions (ADMIN)');
            console.log('   POST   /transactions (ADMIN)');
            console.log('   DELETE /transactions/:id (ADMIN)');
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
