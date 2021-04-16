/*!
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import * as grpc from 'grpc';
import { InterceptingCall, Listener, Metadata, Requester } from 'grpc';
import config from '../../../config/AgentConfig';

type Options = { [key: string]: string | number };

export default function AuthInterceptor(options: Options, nextCall: (options: Options) => InterceptingCall) {
  // https://grpc.github.io/grpc/node/module-src_client_interceptors.html#toc0__anchor
  return new grpc.InterceptingCall(
    nextCall(options),
    new (class implements Requester {
      // tslint:disable-next-line:ban-types
      start(metadata: Metadata, listener: Listener, next: Function) {
        if (config.authorization) {
          metadata.add('Authentication', config.authorization);
        }
        next(metadata, listener);
      }
    })(),
  );
}
