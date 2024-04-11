# Deploying a React application on the Akash Network.

This instruction will be helpful for those intending to try out Akash Network and deploy their React application on it.

## To get started, you'll need:

1. A code editor (I'll be using Visual Studio Code in my examples, but you can use any other).
2. Docker Engine installed (you can install it using this [guide](https://docs.docker.com/engine/install/) on the official Docker website). 
3. Registration on [Docker Hub](https://hub.docker.com/)
4. A web wallet installed such as  [Keplr](https://help.keplr.app/articles/installation-guide-for-keplr-extension-for-beginners) or [Leap](https://www.leapwallet.io/support/how-to-set-up-leap-wallet)

## Step 1 - Add a Dockerfile to the root folder of your application.

For example, I'm using a pre-built and slightly modified Vite setup. You can find instructions for deploying this setup at this [link](https://vitejs.dev/guide/)

So, create a file named Dockerfile in the root of your application (note that you don't need to specify an extension for this file).

Add the following information to it:

```
FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "dev" ]
```

Let's break down what this Dockerfile does step by step. Each step in the Dockerfile is a separate layer that gets created during the image build process.

```
FROM node:18-alpine
```

First, we define the base image upon which our application will run, in this case, Node.

```
WORKDIR /app
```

Defines the working directory (WORKDIR) that will be active in the Docker container at any given time.

```
COPY package.json .
```

Copies our package.json file from the local system to the Docker image.

```
RUN npm install
```

Executes the npm install command inside the Docker image to install all dependencies of our application.

```
COPY . .
```

Copies all other files from the current directory to the Docker image.

```
RUN npm run build
```

Finally, we execute the command npm run build to create a production build of our application inside the Docker image.

```
EXPOSE 8080
```

The step where we define EXPOSE 8080 is a convention and a good practice indicating which port the program "should" run on. We can expose a different port in the Dockerfile and use a completely different port when running the image.

```
CMD [ "npm", "run", "preview" ]
```

The last command npm run dev is executed only when the container is launched. It is not part of the image creation process.

## Step 2 - Create a Docker container and upload it to Docker Hub.

Before creating a Docker container, you first need to create a Docker image. To do this, open a terminal. In my example, I'll be using the bash shell. Navigate to the root folder of your project and execute the following command:

```
docker build . -t "react-akash-project"
```

The above command does two things:

- It creates a Docker image from the current context (i.e., from all files and folders in the current directory).
- It gives the image the name "react-akash-project".

![](./public/image_1.png)

Now we can check the list of available Docker images on our local system by executing the following command:

```
docker images
```

![](./public/image_2.png)

Great! Now let's try running this image, which now becomes a container. Execute the following command to create a container based on the image named "react-akash-project":

```
docker run -p 8080:8080 react-akash-project
```

![](./public/image_3.png)

If all goes well, you should be able to view your application running inside the Docker container at [localhost:8080](http://localhost:8080/).

So, the next step is to upload this Docker image to Docker Hub. Before uploading the image to Docker Hub, you need to properly tag it. The command for this looks like this:

```
docker tag image_name username/repository:tag
```

Here's how this command will look for my case:

```
docker tag react-akash-project kapitoshko/react-akash-project:v1.0
```

To upload the image to Docker Hub, execute the following command:

```
docker push myusername/my_image:latest
```

For me, this command will look like:

```
docker push kapitoshko/react-akash-project:v1.0
```

![](./public/image_4.png)

Now check [Docker Hub](https://hub.docker.com/) to see if your image has appeared. Proceed to the next step.

## Step 3 - Deploying our application on the Akash network.

- Go to the [Cloudmos](https://deploy.cloudmos.io/) website. To deploy your application, you need to have at least 0.5 AKT in your account. Instructions on how to top up your account can be found [here] (https://akash.network/docs/getting-started/token-and-wallets/). Also, during the first login to Cloudmos, create a certificate in the "Settings" section. Click the "Create Certificate" button, confirm all transactions, and the certificate will be ready in a few seconds.

![](./public/image_5.png)

- Create a new deployment, selecting "Hello World", then in the YAML tab, replace the entire content with the following [file](./deploy.yml)

![](./public/image_6.png)

- In this file, update the following fields:

  - Link to your Docker container.
  - Required resources for deployment.

![](./public/image_7.png)

- After making these changes, you need to confirm the initial deposit to start the deployment, which amounts to 0.5 AKT.

![](./public/image_8.png)

- Confirm all necessary steps.

![](./public/image_9.png)

- After a while, you will see a list of providers. Choose the one that best suits your needs, set the appropriate checkbox, and click "ACCEPT BID".

![](./public/image_10.png)

- Then, you confirm everything again.

![](./public/image_11.png)

- After that, go to the EVENTS tab and wait for the appearance of the following text.

![](./public/image_12.png)

- Then you go to the LEASES tab, where you will find a link to your website.

![](./public/image_13.png)

## Congratulations, your application has been successfully deployed on the Akash network!

### Several hacks:

1. If you want to explore the capabilities of the Akash Network but are not yet willing to deposit funds into your account, you can use the sandbox. This is a special environment where you can deploy your application using test tokens. More information about the sandbox can be found [here](https://akash.network/docs/deployments/sandbox/introduction/). The faucet for receiving test tokens is located [here](https://faucet.sandbox-01.aksh.pw/).
2. If you're unfamiliar with using Docker and unsure how to properly create a Dockerfile, you can leverage artificial intelligence tools like ChatGPT, Blackboxа or Copilot. In most cases, though not always on the first attempt, they can help you compose a functional Dockerfile.
3. If you encounter errors when attempting to deploy the app, try closing the deployment first and running it on another provider. If this doesn't resolve the issue, you can always seek assistance from the official Discord channel of Akash Network, where you will definitely be helped.