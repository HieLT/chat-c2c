import chatRouter from './chat.route';
import authRouter from './auth.route';

const route = (app: any) => {
  app.use('/chat',chatRouter);
  app.use('/auth',authRouter)
}

export default route;
