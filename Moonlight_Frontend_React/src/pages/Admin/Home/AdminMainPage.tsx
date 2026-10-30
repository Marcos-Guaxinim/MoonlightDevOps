import { useAuth } from "../../../hooks/auth/useAuth";
import { DASHBOARDS } from "./sections/dashboards";

export function AdminMainPage() {

    function getGreeting(): string {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return "manhã";
        if (hour >= 12 && hour < 18) return "tarde";
        return "noite";
    }

    const {user} = useAuth();

    return(
        <main className="pt-10 min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base">
            <header className="mb-10 justify-self-center w-fit bg-white/5 text-white rounded-xl p-4 border border-white/8 backdrop-blur-sm">
                <h1 className="text-2xl text-center">
                    Olá {user?.name}, como vai nessa {getGreeting()}?
                </h1>
            </header>

            <div className="container justify-self-center flex flex-col gap-10">
                {DASHBOARDS.map((dashboard) => (
                    <section key={dashboard.src} className="flex flex-col gap-4">
                        <h2 className="text-xl text-white font-semibold text-center">
                            {dashboard.title}
                        </h2>
                        <iframe
                            src={dashboard.src}
                            width="100%"
                            height="600px"
                            className="rounded-xl border border-white/10"
                            frameBorder="0"
                        />
                        <hr className="border-white/10" />
                    </section>
                ))}
            </div>

        </main>
    )
}
