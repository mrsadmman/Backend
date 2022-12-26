import dotenv from 'dotenv';
dotenv.config();

const PRODUCTS_FILENAME = 'products';
const CARTS_FILENAME = 'carts';

const config = {
  SERVER: {
    PORT: process.env.PORT || 8080,
    SELECTED_DATABASE: process.env.SELECTED_DB,
  },
  DATABASES: {
    filesystem: {
      PRODUCTS_FILENAME,
      CARTS_FILENAME,
    },
    mongo: {
      url: process.env.MONGO_DB_URL,
      dbName: process.env.MONGO_DB_NAME,
    },
    firebase: {
      type: 'service_account',
      project_id: 'backend-43495-386cb',
      private_key_id: '22ad5b224b9cca76ff9a51bf685a4a4bcda0b165',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJXsI9x0hrFctv\nobKZ032FZkCR5/uaAGTPrMn3J5y4vMkl8J+TUnpwz1O2qiBgb3cjZtMrMrPff4QO\nc4vNLNk3ynmI93xjYilg3tY9butPDeyujHqczbycPbGUYbwBjz9jK1/ld+pdN5K+\nwLfrUC+o1o5j51lIKn7oA8+T8dZe+6WwvRim2x4t+ZsZW2kE0LSDzZVEmtLYxQzh\nIQwP1jma8M+wpC92scvN+W+FEzqUyGXiQmlwPaWedgkIDilyZghjtQUQmtQHn34F\n5QNG71tCZzooJrGLS0TFAC1L88mtw9jk9+PLZdzVcAte3tCJPSC/+pwebOKM5ciW\naCyA+nZBAgMBAAECggEAGCfHSizdGYdgQ3BUodI2VOm6piX7TvJsJWNXSNAWIyz2\nPhhatAvpRx3/r0JCJv9H/dWoUB7BZ/Z+a1Nd+ks+dUxS/uSdJbjRON8SOQVUscN8\nWEXesW+Wh/F4m1GMAW3jDyzVUIvtb6gqcLpidZZFWU3/f6lxUtBSL9fBL0CL1BHJ\n+BMqU3gge5fPFqLX0wrkugpk1K1m/aHxMHiE2z71RYeCQ14IetBDjVvRyYnGYV79\n7mcSIXvo/FRODtBxs7PcWh124WEtCCgbGmyGFAC8rWNUAegA83VWeXLQjUsF58ww\nC56wq03LIncyygL4vJlT1LthMqbqwwJ8AO2g09inFwKBgQD9CpTRcTXOux7iLHWw\n6M1xmh00Kq69wJ3PLCIHeL9qJ+Dgr/U8umWd3zHICQe0y66/oZ5Q97JO3Kgkf+1d\nMkYCQsnGJsgDG8/ows19hwIplaSD4gIE7zUOoq/mPmi50MHQtm75Z0w35gHB6PaU\ns88nyyoVPuIKKJ5afp1cmnvrTwKBgQDLuYMaCgtd4i4taGGgJW7PiqXRCW/1zKgJ\nWOpUTDLQim8TTIwcJTXHqYmIu5MrapaJspCz6YXege/xGPSTY67D8YttUmJHVBNW\n+6BnduyzIMTQ1qDYMpIeZup/34c2hbe+K62GLR4TMA8cbzDHFx/34Th5AAEzeZWA\nULFvxeHhbwKBgGPpiqtMLTfMkLwzW+EXew8xD/jqJYcNCAKmZWVX2xS6XEO7lnR9\nEOSOHWTjk+RiTESkNxO3SfNzkvyeeoXC9PutjWgtJep8T9KTIHpBFax/xq7ATZXP\nMb7uo8+gss8zy2NytUzK6cBklCsRplM+0DvhL2OmKbBjK2uF9PJ8mRNnAoGAEZ9R\ndN4rj4pyHiFqWHUEedVvdH6RfbyfSHe1hWc1+g4Pf6bec8zQMx46NGatW1MUBIM6\nuyVXHCE3RS64cUttIavyOJmowKzII30OqgSCgxgxjjMSpMDzHMggPsFyK8gzVbLn\nhrS+ZkCA/h+sI3yfmkyUGvtiHzbENN5GCvoeCOcCgYBN3I8T/LI0Te1T52XfXZAP\nAdbOEML5l0YOsQXfdc3pD3jrb15WmvKYICyuXXy2t9dPpwyJdiUtdyKijWcvqYhu\n1TwIAubjY8CxOKiZvuW5J21DdxVWfK2zRg6Rr0ZGx0fKPnXmII7oqIvkGsGrCLQI\nO+iiZ8PA1sU/VoOcVaEMHg==\n-----END PRIVATE KEY-----\n',
      client_email: 'firebase-adminsdk-4rt7v@backend-43495-386cb.iam.gserviceaccount.com',
      client_id: '100316149126648981516',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4rt7v%40backend-43495-386cb.iam.gserviceaccount.com',
    },
  },
};

export { config };
