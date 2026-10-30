export function AboutProject() {
  return (
    <section className="pt-8 w-full">
      <div className="w-full flex flex-col gap-6 max-lg:p-6 lg:pl-48 lg:pr-48">
        <div className="gap-4 flex flex-col text-center">
            <h1 className="text-6xl">Sobre o Projeto:</h1>
            <span>Sua motivação, o que foi aprendido e aplicado</span>
        </div>
        <div className="gap-4 flex flex-col">
          <h3 className="text-3xl">
            Motivação:
          </h3>
          <p>
            Moonlight nasceu da necessidade de criar um projeto para o fim de semestre na faculdade, sendo tema livre e aberto para realizar qualquer projeto.<br></br>
            A Ideia veio de fazer algo parecido com a Epic Games e Steam, pois gostamos de jogos e essas plataformas marcam as pessoas junto.
          </p>
        </div>
        <div className="gap-4 flex flex-col">
          <h3 className="text-3xl">
            O que foi aprendido e aplicado:
          </h3>
          <p>
            O que aprendemos nesse periodo foi de extrema valia, aprendemos a fazer POO com TypeScript no backend, reforçamos o aprendizado adquirido em outro curso com react web usando o vite como servidor de dev, ferramenta de build e tailwind para uso de css padronizado em desenvolvimento, além de seguir uma estruturação de projeto melhor do que antes em react.<br></br>
            <br></br>
            De uso de bibliotecas em react, fizemos uso da @phosphor-icons para icones, tailwind pro css, axios para se comunicar com a API, mercado pago para simular pagamentos, toasts feitos do react-hot-toast e tabela do react-data-table-component.<br></br>
            <br></br>
            Para o ambiente de homologação foram criadas imagens de cada parte do app web e feito uso de imagens mysql e nginx, sendo nginx o unico exposto para trazer conteudo externo.
          </p>
        </div>
      </div>
    </section>
  );
}
