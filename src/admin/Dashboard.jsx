import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    BookOpen,
    FileText,
    TrendingUp,
    Eye,
    Activity,
    Calendar,
    Award
} from 'lucide-react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';

function Dashboard() {
    // Sample data - Replace with real Firebase data
    const [stats, setStats] = useState({
        totalUsers: 1234,
        totalBlogs: 45,
        totalCourses: 28,
        totalViews: 8956
    });

    // Monthly user registration data
    const userRegistrationData = [
        { month: 'Jan', users: 65 },
        { month: 'Feb', users: 89 },
        { month: 'Mar', users: 120 },
        { month: 'Apr', users: 95 },
        { month: 'May', users: 145 },
        { month: 'Jun', users: 178 }
    ];

    // Page views data
    const pageViewsData = [
        { name: 'Week 1', blogs: 240, courses: 320 },
        { name: 'Week 2', blogs: 380, courses: 420 },
        { name: 'Week 3', blogs: 320, courses: 380 },
        { name: 'Week 4', blogs: 450, courses: 520 }
    ];

    // Category distribution
    const categoryData = [
        { name: 'Blogs', value: 45, color: '#ff6575' },
        { name: 'Courses', value: 28, color: '#113471' },
        { name: 'Users', value: 1234, color: '#4ade80' }
    ];

    // Recent activity data
    const recentActivity = [
        { day: 'Mon', views: 450 },
        { day: 'Tue', views: 520 },
        { day: 'Wed', views: 380 },
        { day: 'Thu', views: 650 },
        { day: 'Fri', views: 720 },
        { day: 'Sat', views: 580 },
        { day: 'Sun', views: 490 }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const StatCard = ({ icon: Icon, title, value, color, delay }) => (
        <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                style={{ background: color, transform: 'translate(30%, -30%)' }}
            />
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl`} style={{ backgroundColor: `${color}20` }}>
                        <Icon size={24} style={{ color: color }} />
                    </div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: delay + 0.3, type: "spring" }}
                    >
                        <TrendingUp size={20} className="text-green-500" />
                    </motion.div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
                <motion.p
                    className="text-3xl font-bold"
                    style={{ color: color }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: delay + 0.2 }}
                >
                    {value.toLocaleString()}
                </motion.p>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold text-[#113471] mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                    <Calendar size={16} />
                    Welcome back! Here's what's happening today.
                </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
                <StatCard
                    icon={Users}
                    title="Total Users"
                    value={stats.totalUsers}
                    color="#113471"
                    delay={0}
                />
                <StatCard
                    icon={FileText}
                    title="Total Blogs"
                    value={stats.totalBlogs}
                    color="#ff6575"
                    delay={0.1}
                />
                <StatCard
                    icon={BookOpen}
                    title="Total Courses"
                    value={stats.totalCourses}
                    color="#113471"
                    delay={0.2}
                />
                <StatCard
                    icon={Eye}
                    title="Total Views"
                    value={stats.totalViews}
                    color="#ff6575"
                    delay={0.3}
                />
            </motion.div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* User Registration Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-[#113471] bg-opacity-10 rounded-lg">
                            <Users size={20} className="text-[#113471]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#113471]">User Registrations</h3>
                            <p className="text-sm text-gray-500">Monthly growth</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={userRegistrationData}>
                            <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#113471" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#113471" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" stroke="#999" />
                            <YAxis stroke="#999" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '2px solid #113471',
                                    borderRadius: '12px'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="users"
                                stroke="#113471"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorUsers)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Page Views Chart */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-[#ff6575] bg-opacity-10 rounded-lg">
                            <Activity size={20} className="text-[#ff6575]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#113471]">Page Views</h3>
                            <p className="text-sm text-gray-500">Weekly comparison</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={pageViewsData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" stroke="#999" />
                            <YAxis stroke="#999" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '2px solid #ff6575',
                                    borderRadius: '12px'
                                }}
                            />
                            <Legend />
                            <Bar
                                dataKey="blogs"
                                fill="#ff6575"
                                radius={[8, 8, 0, 0]}
                                animationDuration={1000}
                            />
                            <Bar
                                dataKey="courses"
                                fill="#113471"
                                radius={[8, 8, 0, 0]}
                                animationDuration={1000}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-[#113471] bg-opacity-10 rounded-lg">
                            <TrendingUp size={20} className="text-[#113471]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#113471]">Weekly Activity</h3>
                            <p className="text-sm text-gray-500">Daily views trend</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={recentActivity}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="day" stroke="#999" />
                            <YAxis stroke="#999" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '2px solid #113471',
                                    borderRadius: '12px'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="views"
                                stroke="#ff6575"
                                strokeWidth={3}
                                dot={{ fill: '#ff6575', r: 6 }}
                                activeDot={{ r: 8 }}
                                animationDuration={1500}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Category Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-[#ff6575] bg-opacity-10 rounded-lg">
                            <Award size={20} className="text-[#ff6575]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#113471]">Overview</h3>
                            <p className="text-sm text-gray-500">Content distribution</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                animationDuration={1000}
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                        {categoryData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-sm text-gray-600">{item.name}</span>
                                </div>
                                <span className="text-sm font-bold" style={{ color: item.color }}>
                                    {item.value}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Dashboard;