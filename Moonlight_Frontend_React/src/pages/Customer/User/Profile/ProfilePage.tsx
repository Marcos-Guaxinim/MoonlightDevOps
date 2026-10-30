import { Card, CardHeader } from "../../../../components/common/Generic/Card";
import { BackgroundCircle } from "../../../../components/common/Generic/BackgroundCircle";
import { EditForm } from "./sections/EditForm";
import { ProfileData } from "./sections/ProfileData";


function ProfilePage() {

  return (
    <main className="min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex items-center justify-center">
        <BackgroundCircle/>

        <div className="p-10 relative w-full flex flex-col gap-10 max-lg:max-w-md lg:max-w-xl animate-fade-in">
          <ProfileData/>
          <Card className="flex flex-col gap-10 border p-8">
            <CardHeader><h1 className="text-2xl">Editar Usuario:</h1></CardHeader>
            <EditForm/>
          </Card>
        </div>
    </main>
  )
}


export default ProfilePage;
