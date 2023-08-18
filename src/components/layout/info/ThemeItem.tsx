
interface ThemeType {
    color: string;
    img: string;
    changeColor: (color: string) => void;
}

const ThemeItem = ({color, img, changeColor}: ThemeType) => {
  return (
   <img src={img} alt="" className="theme__img" onClick={() => {changeColor(color)}} />
  );
};

export default ThemeItem;
