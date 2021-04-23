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

import Span from '../../trace/span/Span';
import ID from '../../trace/ID';
import NewID from '../../trace/NewID';
import SegmentRef from '../../trace/context/SegmentRef';

/**
 * 一个 Segment 包含很多的 span  
 */
export default class Segment {
  segmentId = new ID();
  spans: Span[] = [];
  relatedTraces: ID[] = [new NewID()];
  references: SegmentRef[] = [];

  archive(span: Span): void {
    this.spans.push(span);
  }

  /**
   * 关联一个 trace  
   * @param id 
   */
  relate(id: ID) {
    if (this.relatedTraces[0] instanceof NewID) {
      this.relatedTraces.shift();
    }
    if (!this.relatedTraces.includes(id)) {
      this.relatedTraces.push(id);
    }
  }

  refer(ref: SegmentRef): this {
    if (!this.references.includes(ref)) {
      this.references.push(ref);
    }

    return this;
  }
}
