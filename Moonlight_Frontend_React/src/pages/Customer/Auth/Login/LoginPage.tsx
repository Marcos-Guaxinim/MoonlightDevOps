
import { Button } from "../../../../components/common/Generic/Button/Button";
import { Card } from "../../../../components/common/Generic/Card";
import { BackgroundCircle } from "../../../../components/common/Generic/BackgroundCircle";
import { LoginForm } from "./sections/LoginForm";
import moonlightIcone from "@/assets/MoonlightIcone.png";
import { AuthTabs } from "../../../../components/common/Forms/AuthTabs";


function LoginPage() {

    return (
          <main className="p-24 bg-gradient-to-b from-base-soft via-base-soft to-base flex items-center justify-center">
            {/* Fundo decorativo */}
              <BackgroundCircle />

              <div className="relative w-full max-w-md animate-fade-in">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Button as="link" href="/" className="bg-transparent flex items-center gap-3 group">
                        <img src={moonlightIcone} alt="Moonlight" className="h-auto w-auto" />
                    </Button>
                </div>

                {/* Card */}
                <Card className="bg-white/5 border border-white/8 rounded-sm p-8 backdrop-blur-sm">
                    <AuthTabs/>
                    <LoginForm/>
                </Card>

              </div>
          </main>
    );
}

export default LoginPage;
