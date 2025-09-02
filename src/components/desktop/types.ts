export interface GameWindow {
  id: string;
  title: string;
  icon: string;
  component: React.ComponentType<any>;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  zIndex: number;
}