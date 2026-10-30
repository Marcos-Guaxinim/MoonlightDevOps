import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { Card } from "../../../../components/common/Generic/Card";

export function AboutUs() {
  return (
    <section className="pt-8 w-full">
      <div className="w-full flex flex-col gap-6 animate-fade-in p-6">
        <div className="gap-4 flex flex-col text-center">
            <h1 className="text-6xl">Sobre nós:</h1>
            <span>Resumo breve sobre quem somos</span>
        </div>
        <div className="grid max-xl:grid-cols-1 grid-cols-2 self-center gap-25">
          <Card className="grid gap-4 items-center max-w-3xl [grid-template-areas:'foto''texto''botao'] lg:[grid-template-areas:'foto_texto''botao_botao'] lg:grid-cols-[auto_1fr]">
            <div className="[grid-area:foto] justify-self-center h-64">
              <img className="rounded-xl w-full h-full object-contain" src="https://avatars.githubusercontent.com/u/144163385?v=4"></img>
            </div>
            <div className="[grid-area:texto] flex flex-col gap-4 max-lg:text-center">
              <h3 className="text-3xl">
                Arthur Antonio de Araujo:
              </h3>
              <p>
                Olá, Sou o Arthur!<br></br>
                <br></br>
                Tenho 20 anos e persigo o caminho da programação WEB e Mobile.<br></br>
                <br></br>
                Agradeço a Deus e a todos que me ajudam na vida por me guiarem onde estou.<br></br>
                <br></br>
                Procuro estar aprendendo mais sobre o que a tecnologia pode nos trazer e por estar usando Computador e Celular desde pequeno.<br></br>
                <br></br>
                Tenho boa experiencia com programação graças aos Cursos de Programação de Sistemas, WEB e faculdade de TADS.<br></br>
              </p>
            </div>
            <div className="[grid-area:botao] flex justify-around">
              <Button className="p-2 rounded-md w-fit flex items-center" variant="cta" as="link" href="https://github.com/arthurpelitoo">
                <span><GithubLogoIcon size={32} weight="thin" /></span>
                Conheça meu Github
              </Button>
            </div>
          </Card>
          <Card className="grid gap-4 items-center max-w-3xl [grid-template-areas:'foto''texto''botao'] lg:[grid-template-areas:'foto_texto''botao_botao'] lg:grid-cols-[auto_1fr]">
            <div className="[grid-area:foto] justify-self-center h-64">
              <img className="rounded-xl w-full h-full object-contain" src="https://avatars.githubusercontent.com/u/144161986?v=4"></img>
            </div>
            <div className="[grid-area:texto] flex flex-col gap-4 max-lg:text-center">
              <h3 className="text-3xl">
                Marcos Vinicius da Silva Inglez:
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsum veritatis facilis velit corrupti. Placeat distinctio sit omnis obcaecati? Repudiandae sed dolor exercitationem eos molestias ex aut minus assumenda consectetur!<br></br>
                <br></br>
                lorem<br></br>
                <br></br>
                lorem<br></br>
                <br></br>
                lorem<br></br>
                <br></br>
                lorem<br></br>
              </p>
            </div>
            <div className="[grid-area:botao] flex justify-around">
              <Button className="p-2 rounded-md w-fit flex items-center" variant="cta" as="link" href="https://github.com/Foxsa-Crypto">
                <span><GithubLogoIcon size={32} weight="thin" /></span>
                Conheça meu Github
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
