export const setNewOffset = (
  card,
  mouseMoveDir = { xChange: 0, yChange: 0 }
) => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.xChange;
  const offsetTop = card.offsetTop - mouseMoveDir.yChange;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

export const autoGrow = (textAreaRef) => {
  const { current } = textAreaRef;
  current.style.height = "auto";
  current.style.height = current.scrollHeight + "px";
};

export const setZIndex = (selectedCard) => {
  selectedCard.style.zIndex = 999;

  const allCards = Array.from(document.getElementsByClassName("card"));

  allCards.forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  });

  // selectedCard.style.zIndex = 999;

  // Array.from(document.getElementsByClassName("card")).forEach((card) => {
  //   if (card !== selectedCard) {
  //     card.style.zIndex = selectedCard.style.zIndex - 1;
  //   }
  // });
};

export const bodyParser = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
