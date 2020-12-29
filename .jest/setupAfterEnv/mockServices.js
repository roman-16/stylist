import { rest } from 'msw';
import { setupServer } from 'msw/node';

const graphqlListener = (operations) =>
  rest.post('https://gql-stage.blue-tomato.com*', (req, res, ctx) =>
    res(
      ctx.json(
        req.body.map(({ operationName }) => ({
          data:
            operations[operationName]?.(req, res, ctx) ??
            // eslint-disable-next-line no-console
            console.log(`No resolver found for operation ${operationName}`),
        })),
      ),
    ),
  );

const server = setupServer(
  graphqlListener({
    BlueWorldStories: () => ({ blueWorldStories: [] }),
    ShopYourStyleStyles: () => ({ shopYourStyleStyles: [] }),
    ShopYourStyleProductOverview: () => ({ products: [] }),
    WidgetTranslations: () => ({ widget: { translations: [] } }),
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
