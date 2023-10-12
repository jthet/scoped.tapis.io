import { errorDecoder } from 'tapis-api/utils';
import StreamSaver from 'streamsaver';

const downloadStream = (
  systemId: string,
  path: string,
  destination: string,
  zip: boolean,
  onStart: null | ((response: Response) => void),
  basePath: string,
  jwt: string
): Promise<Response> => {
  const fileStream = StreamSaver.createWriteStream(destination);
  const url = `${basePath}/v3/files/content/${systemId}/${path}${
    zip ? '?zip=true' : ''
  }`;

  const config = {
    headers: {
      'X-Tapis-Token': jwt,
    },
  };

  return errorDecoder<Response>(() =>
    fetch(url, config).then((response) => {
      onStart && onStart(response);
      if (!response.body) {
        throw new Error('Download response had no body!');
      }
      console.log('HELLO');
      console.log(response.body);
      const readableStream = response.body;

      console.log(response.text());

      // more optimized
      if (window.WritableStream && readableStream?.pipeTo) {
        return readableStream.pipeTo(fileStream);
        //.then(() => console.log('done writing'));
      }

      (window as any).writer = fileStream.getWriter();

      const reader = response.body!.getReader();
      const pump = () =>
        reader
          .read()
          .then((res) =>
            res.done
              ? (window as any).writer.close()
              : (window as any).writer.write(res.value).then(pump)
          );

      return pump();
    })
  );
};

export default downloadStream;
