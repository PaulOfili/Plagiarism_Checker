// import SearchReport from '../screens/DashboardPages/pages/SearchReport';
import DashboardHome from '../screens/DashboardPages/pages/DashBoardHome';
import PendingRequests from '../screens/DashboardPages/pages/PendingRequests';
import AssignedRequests from '../screens/DashboardPages/pages/AssignedRequests';
import CompletedRequests from '../screens/DashboardPages/pages/CompletedRequests';
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
        component: AssignedRequests
    },
    {
        url: 'recent-submissions',
        header_name: 'Recent Submissions',
        sidebar_name: 'Recent Submissions',
        icon: 'container',
        component: PendingRequests
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
        component: CompletedRequests
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