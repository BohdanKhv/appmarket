import { ProfileInfo, Header } from "../components"

const Profile = () => {
  return (
    <div className="content mx-w-lg mx-auto">
      <Header label={'Profile'} />
      <ProfileInfo/>
    </div>
  )
}

export default Profile