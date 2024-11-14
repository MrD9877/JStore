import LoginPage from '@/components/LoginCard';
import NavBottom from '@/components/NavBottom'
import UserProfileCard from '@/components/UserProfileCard'
import SearchBar from '@/navBars/SearchBar'


export default async function ProfilePage() {
    let user;
    const res = await fetch("https://api.escuelajs.co/api/v1/users")
    // user = await res.json()
    return (
        <div>
            <SearchBar />
            <div style={{ maxWidth: "100vw" }} className='mb-20 w-screen'>
                {user ? (
                    <UserProfileCard user={user[0]} />) : (
                    <>
                        <div className='bg-slate-200 flex align-middle pt-16 h-5/6'>
                            <LoginPage welcome={false} />
                        </div>
                    </>
                )}

            </div>
            <NavBottom />
        </div>
    )
}
