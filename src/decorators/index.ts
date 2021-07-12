function CatchError(): any {
  return (
    _: object,
    __: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const orignalValue = descriptor.value;
    descriptor.value = async function (...args: any[]): Promise<any> {
      const [request, response, nextFunction] = args;

      try {
        return await orignalValue.apply(this, args);
      } catch (error) {
        nextFunction(error);
      }
    };
    return descriptor;
  };
}

export { CatchError };
