import example from "./src/example";
import input from "./src/input";

const enum Direction {
  Top = 0,
  Right = 1,
  Down = 2,
  Left = 3
}

const enum PipeElement {
  VPipe = "|",
  HPipe = "-",
  NEPipe = "└",
  NWPipe = "┘",
  SWPipe = "┐",
  SEPipe = "┌"
}

interface AnimalPosition {
  x: number;
  y: number;
}

function readPipeData(content: string, replaceAnimalWith: string) {
  const rawPipeMap = content.split("\n");

  const animalPositionY = rawPipeMap.findIndex((line) => line.includes("S"));
  const animalPositionX = rawPipeMap[animalPositionY].split("").findIndex((char) => char === "S");
  const animalPosition = { x: animalPositionX, y: animalPositionY } as AnimalPosition;

  const pipeMap = rawPipeMap.map((line) => {
    return line
      .replace(/L/g, "└")
      .replace(/J/g, "┘")
      .replace(/7/g, "┐")
      .replace(/F/g, "┌")
      .replace(/S/g, replaceAnimalWith)
      .split("");
  });
  return {
    animalPosition: animalPosition,
    pipeMap: pipeMap as ReadonlyArray<ReadonlyArray<PipeElement>>
  };
}

const isLoopFulfilled = (
  startingAnimalPosition: AnimalPosition,
  currentAnimalPosition: AnimalPosition
): boolean => {
  return (
    startingAnimalPosition.x === currentAnimalPosition.x &&
    startingAnimalPosition.y === currentAnimalPosition.y
  );
};

function part1(content: string, replaceAnimalWith: string) {
  const { animalPosition, pipeMap } = readPipeData(content, replaceAnimalWith);
  const currentAnimalPosition: AnimalPosition = { ...animalPosition };

  let direction: Direction = Direction.Top;
  let loopLength = 0;

  while (true) {
    const pipeElement: PipeElement = pipeMap[currentAnimalPosition.y][currentAnimalPosition.x];

    if (loopLength > 0 && isLoopFulfilled(animalPosition, currentAnimalPosition)) break;

    loopLength++;

    switch (pipeElement) {
      case PipeElement.VPipe:
        currentAnimalPosition.y =
          direction === Direction.Down ? currentAnimalPosition.y - 1 : currentAnimalPosition.y + 1;
        break;

      case PipeElement.HPipe:
        currentAnimalPosition.x =
          direction === Direction.Right ? currentAnimalPosition.x + 1 : currentAnimalPosition.x - 1;
        break;

      case PipeElement.NEPipe:
        if (direction === Direction.Top) {
          currentAnimalPosition.x += 1;
          direction = Direction.Right;
        } else {
          currentAnimalPosition.y -= 1;
          direction = Direction.Down;
        }
        break;

      case PipeElement.NWPipe:
        if (direction === Direction.Top) {
          currentAnimalPosition.x -= 1;
          direction = Direction.Left;
        } else {
          currentAnimalPosition.y -= 1;
          direction = Direction.Down;
        }
        break;

      case PipeElement.SWPipe:
        if (direction === Direction.Down) {
          currentAnimalPosition.x -= 1;
          direction = Direction.Left;
        } else {
          currentAnimalPosition.y += 1;
          direction = Direction.Top;
        }
        break;

      case PipeElement.SEPipe:
        if (direction === Direction.Down) {
          currentAnimalPosition.x += 1;
          direction = Direction.Right;
        } else {
          currentAnimalPosition.y += 1;
          direction = Direction.Top;
        }
        break;
    }
  }
  return loopLength / 2;
}

console.log(part1(example, "┌"));
console.log(part1(input, "|"));
