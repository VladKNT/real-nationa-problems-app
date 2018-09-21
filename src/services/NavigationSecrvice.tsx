import { NavigationActions } from "react-navigation";

class NavigationService {
    protected navigator: any;

    constructor(){
        this.navigator = null;
    }

    setNavigator(navigator: any){
        console.info(navigator);
        this.navigator = navigator;
    }

    navigate(routeName: string, params?: any) {
        if (this.navigator) {
            this.navigator.dispatch(NavigationActions.navigate({routeName, params}));
        } else {
            throw new Error("Navigator is not initialized");
        }
    }
}

const navigatorService = new NavigationService();
export default navigatorService;
