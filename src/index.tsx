import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-kyun2da' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Kyun2da = NativeModules.Kyun2da
  ? NativeModules.Kyun2da
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return multiply2(a, b);
}

async function multiply2(a: number, b: number): Promise<number> {
  const result = await Kyun2da.multiply(a, b);

  return result + 2;
}
