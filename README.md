This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).




// 无状态组建
import React, { MouseEvent, SFC } from 'react'

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
  src: string,
  show: boolean,
}

const BigImage: SFC<Props> = ({ onClick, show, src }) => {
  return show ? <div className="big-img-wrap" onClick={onClick}>
      <div className="big-img-content">
        <img src={src} className="big-img"} alt="" />
      </div>
  </div> : null;
}

export default IMBigImage;
















// 有状态组建


import React, { Component } from 'react';

import { Button } from 'antd';

type IProps = Readonly<{
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: Function;
}>;

const initialState = { clickCount: 0 };
type IState = Readonly<typeof initialState>;

class ButtonCounter extends Component<IProps, IState> {
  readonly state: IState = initialState;
  
  componentWillReceiveProps(nextProps: any) {
    const { value } = nextProps;
    if (value) {
      this.setState({
        clickCount: value
      })
    }
  }

  render() {
    const { clickCount } = this.state;
    const { className, style } = this.props;
    return (
      <div className={`${className}`} style={`${style}`}>
        <Button onClick={this.handleIncrement}>Increment</Button>
        <Button onClick={this.handleDecrement}>Decrement</Button>
        You've clicked me {clickCount} times!
      </div>
    );
  }

  private handleIncrement = () => {
    const { onChange } = this.props;
    const { clickCount } = this.state;
    this.setState({
      clickCount: clickCount + 1,
    });  
    onChange && onChange(clickCount + 1);
  };
  private handleDecrement = () => {
    const { onChange } = this.props;
    const { clickCount } = this.state;
    this.setState({
      clickCount: clickCount - 1,
    });  
    onChange && onChange(clickCount - 1);
  }
}
