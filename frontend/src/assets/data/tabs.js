import { appIcon, appFillIcon, institutionIcon, institutionFillIcon, homeIcon, homeFillIcon, gameIcon, gameFillIcon, videoIcon, videoFillIcon, newsIcon, newsFillIcon, userIcon, developerIcon, likeIcon } from '../img/icons'

const dashboardTabs = [
    {
        label: "Developer",
        icon: institutionIcon,
        fillIcon: institutionFillIcon
    }, {
        label: "Apps",
        icon: appIcon,
        fillIcon: appFillIcon
    },
]

const navMenu = [
    {
        label: "Home",
        icon: homeIcon,
        fillIcon: homeFillIcon,
        path: "/"
    }, {
        label: "Apps",
        icon: appIcon,
        fillIcon: appFillIcon,
        path: "/store/apps"
    }, {
        label: "Gaming",
        icon: gameIcon,
        fillIcon: gameFillIcon,
        path: "/store/games"
    }, {
        label: "Content",
        icon: videoIcon,
        fillIcon: videoFillIcon,
        path: "/store/content"
    }, {
        label: "News",
        icon: newsIcon,
        fillIcon: newsFillIcon,
        path: "/store/news"
    }
]

const navUser = [
    {
        label: "Profile",
        icon: userIcon,
        path: "/user/profile"
    }, {
        label: "Developer",
        icon: developerIcon,
        path: "/user/developer"
    }, {
        label: "Favorite",
        icon: likeIcon,
        path: "/library/favorite"
    },
]

export {
    dashboardTabs,
    navMenu,
    navUser
}