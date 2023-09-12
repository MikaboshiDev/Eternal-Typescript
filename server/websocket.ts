import ws from 'websocket';
import http from 'http';
import { logWithLabel } from '../src/utils/console';

var server = http.createServer(function (request, response) {
   logWithLabel('websocket', 'Received request for ' + request.url);
   response.writeHead(404);
   response.end();
});
server.listen(process.env.port_websocket!, function () {
   logWithLabel(
      'websocket',
      `Server is listening on port ${process.env.port_websocket!}`
   );
});

const wsServer = new ws.server({
   httpServer: server,
   autoAcceptConnections: false,
});

function originIsAllowed(origin: any) {
   return true;
}

wsServer.on(
   'request',
   function (request: {
      origin: string;
      reject: () => void;
      accept: (arg0: string, arg1: any) => any;
   }) {
      if (!originIsAllowed(request.origin)) {
         request.reject();
         logWithLabel('websocket', 'Connection from origin ' + request.origin);
         return;
      }

      var connection = request.accept('echo-protocol', request.origin);
      logWithLabel('websocket', 'Connection accepted.');
      connection.on(
         'message',
         function (message: {
            type: string;
            utf8Data: string;
            binaryData: { length: string };
         }) {
            if (message.type === 'utf8') {
               logWithLabel(
                  'websocket',
                  'Received Message: ' + message.utf8Data
               );
               connection.sendUTF(message.utf8Data);
            } else if (message.type === 'binary') {
               logWithLabel(
                  'websocket',
                  'Received Binary Message of ' +
                     message.binaryData.length +
                     ' bytes'
               );
               connection.sendBytes(message.binaryData);
            }
         }
      );
      connection.on('close', function (reasonCode: any, description: any) {
         logWithLabel(
            'websocket',
            'Peer ' + connection.remoteAddress + ' disconnected.'
         );
      });
   }
);

export { wsServer }