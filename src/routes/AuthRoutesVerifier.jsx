import routes from './Routes'

const AuthRoutesVerifier = (testingRoute) => {
    var needLoggin = false;
    for (let route of routes){
        if(route.path === testingRoute){
            needLoggin = route.logginNeeded;
            break;
        }
    }
    return {needLoggin}
}

export default AuthRoutesVerifier
