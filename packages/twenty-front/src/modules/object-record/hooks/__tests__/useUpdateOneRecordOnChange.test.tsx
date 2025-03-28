import {
  query,
  responseData,
} from '@/object-record/hooks/__mocks__/useUpdateOneRecord';
import { useRefetchAggregateQueries } from '@/object-record/hooks/useRefetchAggregateQueries';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { MockedResponse } from '@apollo/client/testing';
import { act, renderHook } from '@testing-library/react';
import { getJestMetadataAndApolloMocksWrapper } from '~/testing/jest/getJestMetadataAndApolloMocksWrapper';

const person = { id: '36abbb63-34ed-4a16-89f5-f549ac55d0f9' };

const updateOld = {
  name: {
    firstName: 'John',
    lastName: 'Doe',
  },
};

const updateNew = {
  name: {
    firstName: 'Jane',
    lastName: 'Smith',
  },
};

const updatePersonOld = {
  ...person,
  ...responseData,
  ...updateOld,
};

const updatePersonNew = {
  ...person,
  ...responseData,
  ...updateNew,
};

const variablesOldUpdate = {
  idToUpdate: person.id,
  input: updateOld,
};

const variablesNewUpdate = {
  idToUpdate: person.id,
  input: updateNew,
};

const mocks: Array<MockedResponse> = [
  {
    request: {
      query,
      variables: variablesOldUpdate,
    },
    result: jest.fn(() => ({
      data: {
        updatePerson: updatePersonOld,
      },
    })),
  },
  {
    request: {
      query,
      variables: variablesNewUpdate,
    },
    result: jest.fn(() => ({
      data: {
        updatePerson: updatePersonNew,
      },
    })),
  },
];

jest.mock('@/object-record/hooks/useRefetchAggregateQueries');
const mockRefetchAggregateQueries = jest.fn();
(useRefetchAggregateQueries as jest.Mock).mockReturnValue({
  refetchAggregateQueries: mockRefetchAggregateQueries,
});

const Wrapper = getJestMetadataAndApolloMocksWrapper({
  apolloMocks: mocks,
});

describe('useUpdateOneRecordOnChange', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the record with the first set of data and then with new data', async () => {
    const { result } = renderHook(
      () => useUpdateOneRecord({ objectNameSingular: 'person' }),
      {
        wrapper: Wrapper,
      },
    );

    // First update with updateOld
    let res;
    await act(async () => {
      res = await result.current.updateOneRecord({
        idToUpdate: person.id,
        updateOneRecordInput: updateOld,
      });
    });

    expect(res).toBeDefined();
    expect(res).toHaveProperty('id', person.id);
    expect(res).toHaveProperty('name', updateOld.name);

    expect(mockRefetchAggregateQueries).toHaveBeenCalledTimes(1);

    await act(async () => {
      res = await result.current.updateOneRecord({
        idToUpdate: person.id,
        updateOneRecordInput: updateOld,
      });
    });

    expect(res).toBeNull();

    expect(mockRefetchAggregateQueries).toHaveBeenCalledTimes(1);

    await act(async () => {
      res = await result.current.updateOneRecord({
        idToUpdate: person.id,
        updateOneRecordInput: updateNew,
      });
    });

    expect(res).toBeDefined();
    expect(res).toHaveProperty('id', person.id);
    expect(res).toHaveProperty('name', updateNew.name);

    expect(mockRefetchAggregateQueries).toHaveBeenCalledTimes(2);
  });
});
