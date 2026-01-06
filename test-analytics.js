const axios = require('axios');

// Test analytics data accuracy
async function testAnalytics() {
    try {
        console.log('Testing analytics accuracy...');

        // Login first
        const loginResponse = await axios.post('http://localhost:3000/api/auth/login', {
            email: 'admin@injahi.com',
            password: 'admin123'
        });

        const token = loginResponse.data.data.token;
        console.log('Login successful');

        // Get student analytics
        const studentAnalytics = await axios.get('http://localhost:3000/api/students/analytics', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log('Student Analytics:');
        console.log('- Total Students:', studentAnalytics.data.data.totalStudents);
        console.log('- Total Inscriptions:', studentAnalytics.data.data.totalInscriptions);
        console.log('- Total Revenue (all-time):', studentAnalytics.data.data.totalRevenue);
        console.log('- Monthly Revenue (theoretical):', studentAnalytics.data.data.monthlyRevenue);
        console.log('- Actual Monthly Revenue:', studentAnalytics.data.data.actualMonthlyRevenue);

        // Get payment analytics
        const paymentAnalytics = await axios.get('http://localhost:3000/api/payments/analytics', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log('\nPayment Analytics:');
        console.log('- Total Received This Month:', paymentAnalytics.data.data.totalReceivedMonth);
        console.log('- Total Expenses:', paymentAnalytics.data.data.totalExpenses);
        console.log('- Net Cash:', paymentAnalytics.data.data.totalReceivedMonth - paymentAnalytics.data.data.totalExpenses);

        // Get formation analytics
        let formationAnalytics = { data: { data: { totalFormations: 0, monthlyRevenue: 0 } } };
        try {
            const response = await axios.get('http://localhost:3000/api/formations/analytics', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            formationAnalytics = response;
            console.log('Formation response:', JSON.stringify(formationAnalytics.data, null, 2));
        } catch (formationError) {
            console.log('Formation analytics error:', formationError.response?.data || formationError.message);
        }

        console.log('\nFormation Analytics:');
        console.log('- Total Formations:', formationAnalytics.data.data.totalFormations || 0);
        console.log('- Monthly Revenue:', formationAnalytics.data.data.monthlyRevenue || 0);

        // Calculate dashboard values
        const theoreticalRevenue = studentAnalytics.data.data.monthlyRevenue + formationAnalytics.data.data.monthlyRevenue;
        const actualReceived = paymentAnalytics.data.data.totalReceivedMonth;
        const unpaid = Math.max(0, theoreticalRevenue - actualReceived);

        console.log('\nDashboard Calculations:');
        console.log('- Theoretical Revenue This Month:', theoreticalRevenue);
        console.log('- Actual Received:', actualReceived);
        console.log('- Unpaid Amount:', unpaid);

    } catch (error) {
        console.error('Analytics test failed:', error.response?.data || error.message);
    }
}

testAnalytics();
