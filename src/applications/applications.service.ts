import { BaseApplication, Application } from './application.interface';
import { Applications } from './applications.interface';

const applications: Applications = {
  1: {
    id: 1,
    name: 'AMP Mobile',
    branchPrefix: 'amp-mobile',
  },
  2: {
    branchPrefix: 'order-pickup',
    id: 2,
    name: 'Order Pickup',

  },
};

export const findall = async (): Promise<Application[]> => Object.values(applications);
export const find = async (id: number): Promise<Application> => applications[id];

export const create = async (newApplication: BaseApplication): Promise<Application> => {
  const id = new Date().valueOf();
  applications[id] = {
    branchPrefix: (newApplication as Application).branchPrefix,
    ...newApplication,
  };

  return applications[id];
};

// eslint-disable-next-line max-len
export const update = async (id: number, applicationUpdate: BaseApplication): Promise<Application | null> => {
  const application = await find(id);

  if (!application) {
    return null;
  }

  // eslint-disable-next-line max-len
  applications[id] = { branchPrefix: (applicationUpdate as Application).branchPrefix, ...applicationUpdate };
  return applications[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const application = await find(id);

  if (!application) {
    return null;
  }

  delete applications[id];
};
