import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const AuthGate = ({children}) => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }
    , [user, navigate])
    return user ? children : null
}

export default AuthGate