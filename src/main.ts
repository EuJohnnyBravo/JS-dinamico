const lampadas = ["./desligada.jpg", "./ligada.jpg", "./quebrada.jpg"];
const OnOff = ["./Off.png", "./On.png"];

const imagemLampada = document.querySelector<HTMLImageElement>("#lamp");
const imagemSwitch = document.querySelector<HTMLImageElement>("#switch");
const interruptor = document.querySelector<HTMLElement>("button");
let lampadaQuebrada: boolean = false;
let ligada: boolean = false;

function vaiQuebrar(): boolean {
  return Math.random() <= 0.05;
}

function ligaDesliga(isLigada: boolean): boolean {
  const valor = isLigada;
  if (valor) {
    return false;
  } else {
    return true;
  }
}

if (interruptor && imagemLampada && imagemSwitch) {
  imagemLampada.src = lampadas[0];
  imagemSwitch.src = OnOff[0];
  interruptor.addEventListener("click", () => {
    ligada = ligaDesliga(ligada);
    if (!lampadaQuebrada) {
      lampadaQuebrada = vaiQuebrar();
      if (ligada) {
        imagemLampada.src = lampadas[1];
        imagemSwitch.src = OnOff[1];
      } else {
        imagemLampada.src = lampadas[0];
        imagemSwitch.src = OnOff[0];
      }
    } else {
      imagemLampada.src = lampadas[2];
    }
  });
  interruptor.addEventListener("click", () => {
    if (ligada) {
      imagemSwitch.src = OnOff[1];
    } else {
      imagemSwitch.src = OnOff[0];
    }
  });

  imagemLampada.addEventListener("click", () => {
    if (!ligada) {
      lampadaQuebrada = false;
      ligada = false;
      imagemLampada.src = lampadas[0];
      imagemSwitch.src = OnOff[0];
    } else {
      alert(
        "Brother, tu não é gato pra ter sete vidas, hein! Desliga esse interruptor agora, que o choque vem e não avisa!"
      );
    }
  });
}
