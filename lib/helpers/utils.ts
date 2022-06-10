
export const catchPromise = async (promise: Promise<any>) => {
    try {
        const res = await promise;
        return [res, null]
    } catch(err: any) {
        return [null, err]
    }
  }

