// import SearchReport from '../screens/DashboardPages/pages/SearchReport';
import DashboardHome from '../screens/DashboardPages/pages/DashBoardHome';
import RecentSubmissions from '../screens/DashboardPages/pages/RecentSubmissions';
import RecentScans from '../screens/DashboardPages/pages/RecentScans';
import AssignmentUpload from '../screens/DashboardPages/pages/AssignmentUpload';
import StudentSubmissions from '../screens/DashboardPages/pages/StudentSubmissions';
import SignIn from '../screens/AuthPages/pages/SignInPage';
import SignUp from '../screens/AuthPages/pages/SignUpPage';

const student_routes = [
    {
        url: 'index',
        header_name: 'Overview',
        sidebar_name: 'Overview',
        icon: 'pie-chart',
        component: DashboardHome
    },
    {
        url: 'assignment-upload',
        header_name: 'Upload Assignment',
        sidebar_name: 'Upload Assignment',
        icon: 'book',
        component: AssignmentUpload
    },
    {
        url: 'recent-submissions',
        header_name: 'Recent Submissions',
        sidebar_name: 'Recent Submissions',
        icon: 'container',
        component: RecentSubmissions
    },
    {
        url: 'recent-scans',
        header_name: 'Recent Scans',
        sidebar_name: 'Recent Scans',
        icon: 'book',
        component: RecentScans
    }
];

const lecturer_routes = [
    {
        url: 'index',
        header_name: 'Overview',
        sidebar_name: 'Overview',
        icon: 'pie-chart',
        component: DashboardHome
    },
    {
        url: 'view-submissions',
        header_name: 'View All Submissions',
        sidebar_name: 'View All Submissions',
        icon: 'book',
        component: StudentSubmissions
    }
]

const auth_routes = [
    {
        url: 'login',
        component: SignIn
    },
    {
        url: 'register',
        component: SignUp
    }
]

export default {student_routes, lecturer_routes, auth_routes}