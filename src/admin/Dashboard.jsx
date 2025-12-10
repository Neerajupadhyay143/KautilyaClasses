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
    Award,
    Loader,
    Star,
    Target
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
import { collection, getDocs, getCountFromServer, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase/config';

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalBlogs: 0,
        totalCourses: 0,
        totalEnrollments: 0
    });
    const [userRegistrationData, setUserRegistrationData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [topCourses, setTopCourses] = useState([]);
    const [courseEngagementData, setCourseEngagementData] = useState([]);

    // 🔥 Fetch Real Data from Firebase
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // 1. Count Users (Total Signups)
                try {
                    const usersRef = collection(db, 'users');
                    const usersSnapshot = await getCountFromServer(usersRef);
                    const userCount = usersSnapshot.data().count;
                    setStats(prev => ({ ...prev, totalUsers: userCount }));
                } catch (error) {
                    console.log('Users collection not found or error:', error);
                }

                // 2. Count and Fetch Blogs
                try {
                    const blogsRef = collection(db, 'blogs');
                    const blogsSnapshot = await getCountFromServer(blogsRef);
                    const blogCount = blogsSnapshot.data().count;
                    setStats(prev => ({ ...prev, totalBlogs: blogCount }));

                    // Fetch recent blogs for activity
                    const blogsQuery = query(blogsRef, orderBy('createdAt', 'desc'));
                    const blogsData = await getDocs(blogsQuery);
                    const blogs = blogsData.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setRecentBlogs(blogs.slice(0, 10));
                } catch (error) {
                    console.error('Error fetching blogs:', error);
                }

                // 3. Count Courses and Get Top Performing Courses
                try {
                    const coursesRef = collection(db, 'courses');
                    const coursesSnapshot = await getCountFromServer(coursesRef);
                    const courseCount = coursesSnapshot.data().count;
                    setStats(prev => ({ ...prev, totalCourses: courseCount }));

                    // Fetch all courses with student count
                    const coursesQuery = query(coursesRef, orderBy('createdAt', 'desc'));
                    const coursesData = await getDocs(coursesQuery);
                    const courses = coursesData.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    // Calculate total enrollments
                    const totalEnroll = courses.reduce((sum, course) => sum + (course.students || 0), 0);
                    setStats(prev => ({ ...prev, totalEnrollments: totalEnroll }));

                    // Get top 5 courses by student count
                    const sortedCourses = [...courses]
                        .sort((a, b) => (b.students || 0) - (a.students || 0))
                        .slice(0, 5)
                        .map(course => ({
                            id: course.id,
                            title: course.title || 'Untitled Course',
                            students: course.students || 0,
                            category: course.category || 'General',
                            thumbnail: course.thumbnail || '',
                            engagement: ((course.students || 0) / totalEnroll * 100).toFixed(1)
                        }));

                    setTopCourses(sortedCourses);

                    // Course Engagement Chart Data (Top 8 courses)
                    const engagementData = [...courses]
                        .sort((a, b) => (b.students || 0) - (a.students || 0))
                        .slice(0, 8)
                        .map(course => ({
                            name: (course.title || 'Untitled').substring(0, 20) + '...',
                            students: course.students || 0,
                            views: (course.views || course.students * 2.5) || 0
                        }));

                    setCourseEngagementData(engagementData);

                } catch (error) {
                    console.error('Error fetching courses:', error);
                }

                // 4. Process User Registration Data (Last 6 months)
                try {
                    const usersRef = collection(db, 'users');
                    const usersData = await getDocs(usersRef);
                    const users = usersData.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    // Group by month
                    const monthData = {};
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const currentMonth = new Date().getMonth();

                    // Initialize last 6 months
                    for (let i = 5; i >= 0; i--) {
                        const monthIndex = (currentMonth - i + 12) % 12;
                        monthData[months[monthIndex]] = 0;
                    }

                    // Count users by month
                    users.forEach(user => {
                        if (user.createdAt) {
                            const date = user.createdAt.toDate ? user.createdAt.toDate() : new Date(user.createdAt);
                            const month = months[date.getMonth()];
                            if (monthData.hasOwnProperty(month)) {
                                monthData[month]++;
                            }
                        }
                    });

                    const chartData = Object.entries(monthData).map(([month, count]) => ({
                        month,
                        users: count
                    }));

                    setUserRegistrationData(chartData);
                } catch (error) {
                    console.log('Error processing user data:', error);
                    // Fallback to sample data
                    setUserRegistrationData([
                        { month: 'Jan', users: 0 },
                        { month: 'Feb', users: 0 },
                        { month: 'Mar', users: 0 },
                        { month: 'Apr', users: 0 },
                        { month: 'May', users: 0 },
                        { month: 'Jun', users: 0 }
                    ]);
                }

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Update category data when stats change
    useEffect(() => {
        setCategoryData([
            { name: 'Blogs', value: stats.totalBlogs, color: '#ff6575' },
            { name: 'Courses', value: stats.totalCourses, color: '#113471' },
            { name: 'Users', value: stats.totalUsers, color: '#4ade80' }
        ]);
    }, [stats]);

    // Recent activity data (Last 7 days - based on enrollments)
    const recentActivity = [
        { day: 'Mon', enrollments: Math.floor(stats.totalEnrollments / 7) },
        { day: 'Tue', enrollments: Math.floor(stats.totalEnrollments / 6) },
        { day: 'Wed', enrollments: Math.floor(stats.totalEnrollments / 8) },
        { day: 'Thu', enrollments: Math.floor(stats.totalEnrollments / 5) },
        { day: 'Fri', enrollments: Math.floor(stats.totalEnrollments / 7) },
        { day: 'Sat', enrollments: Math.floor(stats.totalEnrollments / 9) },
        { day: 'Sun', enrollments: Math.floor(stats.totalEnrollments / 10) }
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
                    {loading ? <Loader className="animate-spin" size={32} /> : value.toLocaleString()}
                </motion.p>
            </div>
        </motion.div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="animate-spin h-16 w-16 text-[#113471] mx-auto mb-4" />
                    <p className="text-xl text-gray-600 font-semibold">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

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
                    title="Total Signups"
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
                    icon={Target}
                    title="Total Enrollments"
                    value={stats.totalEnrollments}
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
                            <h3 className="text-lg font-bold text-[#113471]">User Signups</h3>
                            <p className="text-sm text-gray-500">Last 6 months growth</p>
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

                {/* Course Engagement Chart */}
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
                            <h3 className="text-lg font-bold text-[#113471]">Course Engagement</h3>
                            <p className="text-sm text-gray-500">Top performing courses</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={courseEngagementData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" stroke="#999" angle={-45} textAnchor="end" height={80} fontSize={10} />
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
                                dataKey="students"
                                fill="#ff6575"
                                radius={[8, 8, 0, 0]}
                                animationDuration={1000}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Top Courses Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#ff6575] bg-opacity-10 rounded-lg">
                        <Star size={20} className="text-[#ff6575]" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[#113471]">Top Performing Courses</h3>
                        <p className="text-sm text-gray-500">Most enrolled courses</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {topCourses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border-2 border-gray-100 hover:border-[#ff6575] transition-all"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#113471] text-white flex items-center justify-center text-sm font-bold">
                                        #{index + 1}
                                    </div>
                                    <BookOpen size={16} className="text-[#ff6575]" />
                                </div>
                                <div className="px-2 py-1 bg-[#ff6575] bg-opacity-10 rounded-full">
                                    <span className="text-xs font-bold text-[#ff6575]">{course.engagement}%</span>
                                </div>
                            </div>
                            <h4 className="font-bold text-[#113471] text-sm mb-2 line-clamp-2">
                                {course.title}
                            </h4>
                            <div className="flex items-center justify-between text-xs text-gray-600">
                                <span className="flex items-center gap-1">
                                    <Users size={12} />
                                    {course.students} students
                                </span>
                                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                    {course.category}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-[#113471] bg-opacity-10 rounded-lg">
                            <TrendingUp size={20} className="text-[#113471]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#113471]">Weekly Enrollments</h3>
                            <p className="text-sm text-gray-500">Estimated daily engagement</p>
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
                                dataKey="enrollments"
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
                    transition={{ delay: 0.9 }}
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
                                transition={{ delay: 1 + index * 0.1 }}
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