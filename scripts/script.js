const smooth = document.querySelector(".smooth-scroll");
const introText = document.querySelector(".intro__text");
const icons = document.querySelector(".icons");
const textHorizontal = document.querySelectorAll(".text__horizontal");
const patterns = document.querySelectorAll(".pattern");
const btn = document.getElementsByClassName("btn")[0];
let inputs = document.getElementsByClassName("input-group");
inputs = [...inputs, ...document.getElementsByClassName("text-group")];
const modal = document.querySelector('.modal');
const modalText = document.querySelector('#modalText');
console.log(inputs)

window.addEventListener("scroll", (e) => {
  // console.log(window.scrollY)
  smooth.style.transform = `translateY(${window.scrollY * -0.5}px)`;
  introText.style.transform = `translateY(${window.scrollY * -0.3}px)`;
  icons.style.transform = `translateY(${window.scrollY * -0.6}px)`;
  textHorizontal.forEach((e, i) => {
    e.style.transform = `translateY(${window.scrollY * -0.1}px)`;
  });
  patterns.forEach((e, i) => {
    e.style.transform = `translateY(${window.scrollY * -0.4}px)`;
  });
});

function enableModal(message) {
    modalText.textContent = message
    modal.style.display = 'block'
    setInterval(() => {
        modal.style.display= 'none'
    }, 5000);
}

btn.addEventListener("click", () => {
  let values = [];
  inputs.forEach((input) => {
    if (input.value === "") {
        enableModal("Atleast Enter Something")
    } else {
      values.push(input.value);
    }
  });
  console.log(values.length)
  if (values.length === 3) {
      console.log(values[0], values[1], values[2])
    fetch("https://sheltered-headland-28683.herokuapp.com/", {
      method: "post",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values[0],
        email: values[1],
        message: values[2]
      })
    }).then (res => res.json()).then(res => {
        console.log(res)
        enableModal("Message Sent Successfully");
    }).catch(err => {
        enableModal("Something Bad Hppened In The Server");
    })
  }
});
