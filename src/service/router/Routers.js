
//imports of provider
import LoginProvider from './../../box/provider/dash/Login';
import AboutProvider from './../../box/provider/about/About';
import CustomizationProvider from './../../box/provider/customization/customization';
import MarketingProvider from './../../box/provider/marketing/Marketing';
import CoursesProvider from './../../box/provider/courses/TabsCourses';
import RegistrationProvider from './../../box/provider/signature/Signature';
import AnalyticalProvider from './../../box/provider/analytical/Analytical';
import FinancialProvider from './../../box/provider/financial/Financial';


//imports of students 
import Profile from './../../box/front/student/dashboard/Profile';
import Plan from './../../box/front/student/dashboard/Plan';

const Routers = {
    dash:
    [
        { uri: "login", item: LoginProvider },
        { uri: "about", item: AboutProvider },
        { uri: "customization", item: CustomizationProvider },
        { uri: "marketing", item: MarketingProvider },
        { uri: "course", item: CoursesProvider },
        { uri: "signature", item: RegistrationProvider },
        { uri: "financial", item: FinancialProvider },
        { uri: "analytical", item: AnalyticalProvider },
        //routers students 
        { uri: "profile", item: Profile },
        { uri: "plan", item: Plan }
    ],
    all: function() { return this.dash },
    get: function(way)
    {
        const Route = route => route.uri === way
        return this.dash.find(Route)
    }
}

export default Routers;