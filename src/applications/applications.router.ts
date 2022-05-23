import express, { Request, Response } from 'express';
import * as ApplicationService from './applications.service';
import { BaseApplication, Application } from './application.interface';

export const applicationsRouter = express.Router();

applicationsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const applications: Application[] = await ApplicationService.findall();

    res.status(200).send(applications);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).send(`${e.message}`);
    }
  }
});

applicationsRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const application: Application = await ApplicationService.find(id);

    if (application) {
      return res.status(200).send(application);
    }

    res.status(404).send('Application not found');
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).send(`${e.message}`);
    }
  }
});

applicationsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const application: BaseApplication = req.body;
    const newApplication = await ApplicationService.create(application);

    res.status(201).json(newApplication);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).send(`${e.message}`);
    }
  }
});

applicationsRouter.put('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const applicationUpdate: Application = req.body;

    const existingApplication: Application = await ApplicationService.find(id);

    if (existingApplication) {
      const updatedApplication = await ApplicationService.update(id, applicationUpdate);
      return res.status(200).json(updatedApplication);
    }

    const newApplication = await ApplicationService.create(applicationUpdate);

    res.status(201).json(newApplication);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).send(`${e.message}`);
    }
  }
});

applicationsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ApplicationService.remove(id);

    res.sendStatus(204);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).send(`${e.message}`);
    }
  }
});
