import { AxiosError } from 'axios';
import { backendAPI } from './base';

export type CompaniesQuery = {
  page: number;
};

export type PersonDTO = {
  name: string;
}

export type CompanyDTO = {
  name: string;
  SIC: string;
  id: string;
  companyNumber: string;
  category: string;
  status: string;
  controlledBy: PersonDTO[]
};

export const CompanyApi = {

  getCompanyCount: async () => {
    try {
      const response = await backendAPI.post('/graphql', {
        query: `{
        companyCount
      }`,
      });
      return response.data.data.companyCount as number;
    } catch (error) {
      console.log('handle get company count error', error);
      if (error instanceof AxiosError) {
        let axiosError = error as AxiosError;
        if (axiosError.response?.data) {
          throw new Error(axiosError.response?.data as string);
        }
      }
      throw new Error('Unknown error, please contact the administrator');
    }
  },

  getCompanyList: async (params?: CompaniesQuery) => {

    try {
      const response = await backendAPI.post('/graphql', {
        query: `{
        companyList(page: ${params?.page || 0}) {
          name,
          SIC,
          id,
          companyNumber,
          category,
          status,
          controlledBy {
            name
          }
        }}`,
      });
      return response.data.data.companyList as CompanyDTO[];
    } catch (error) {
      console.log('handle get companies error', error);
      if (error instanceof AxiosError) {
        let axiosError = error as AxiosError;
        if (axiosError.response?.data) {
          throw new Error(axiosError.response?.data as string);
        }
      }
      throw new Error('Unknown error, please contact the administrator');
    }
  },
  createCompany: async (companyData: CompanyDTO) => {
    try {
      const response = await backendAPI.post('/graphql', {
        query: `
          mutation CreateCompany($input: CompanyInput!) {
            createCompany(input: $input) {
              name,
              SIC,
              id,
              companyNumber,
              category,
              status,
              controlledBy {
                name
              }
            }
          }
        `,
        variables: {
          input: companyData,
        },
      });
      return response.data.data.createCompany as CompanyDTO;
    } catch (error) {
      console.log('handle create company error', error);
      if (error instanceof AxiosError) {
        let axiosError = error as AxiosError;
        if (axiosError.response?.data) {
          throw new Error(axiosError.response?.data as string);
        }
      }
      throw new Error('Unknown error, please contact the administrator');
    }
  },

  updateCompany: async (companyId: string, companyData: CompanyDTO) => {
    try {
      const response = await backendAPI.post('/graphql', {
        query: `
          mutation UpdateCompany($id: ID!, $input: CompanyInput!) {
            updateCompany(id: $id, input: $input) {
              name,
              SIC,
              id,
              companyNumber,
              category,
              status,
              controlledBy {
                name
              }
            }
          }
        `,
        variables: {
          id: companyId,
          input: companyData,
        },
      });
      return response.data.data.updateCompany as CompanyDTO;
    } catch (error) {
      console.log('handle update company error', error);
      if (error instanceof AxiosError) {
        let axiosError = error as AxiosError;
        if (axiosError.response?.data) {
          throw new Error(axiosError.response?.data as string);
        }
      }
      throw new Error('Unknown error, please contact the administrator');
    }
  },

  deleteCompany: async (companyId: string) => {
    try {
      const response = await backendAPI.post('/graphql', {
        query: `
          mutation DeleteCompany($id: ID!) {
            deleteCompany(id: $id)
          }
        `,
        variables: {
          id: companyId,
        },
      });
      return response.data.data.deleteCompany as boolean;
    } catch (error) {
      console.log('handle delete company error', error);
      if (error instanceof AxiosError) {
        let axiosError = error as AxiosError;
        if (axiosError.response?.data) {
          throw new Error(axiosError.response?.data as string);
        }
      }
      throw new Error('Unknown error, please contact the administrator');
    }
  },
};
