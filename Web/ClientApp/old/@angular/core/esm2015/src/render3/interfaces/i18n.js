/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export function getParentFromI18nMutateOpCode(mergedCode) {
    return mergedCode >>> 17 /* SHIFT_PARENT */;
}
export function getRefFromI18nMutateOpCode(mergedCode) {
    return (mergedCode & 131064 /* MASK_REF */) >>> 3 /* SHIFT_REF */;
}
export function getInstructionFromI18nMutateOpCode(mergedCode) {
    return mergedCode & 7 /* MASK_INSTRUCTION */;
}
/**
 * Marks that the next string is an element name.
 *
 * See `I18nMutateOpCodes` documentation.
 */
export const ELEMENT_MARKER = {
    marker: 'element'
};
/**
 * Marks that the next string is comment text.
 *
 * See `I18nMutateOpCodes` documentation.
 */
export const COMMENT_MARKER = {
    marker: 'comment'
};
// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
export const unusedValueExportToPlacateAjd = 1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy9pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQWdGSCxNQUFNLFVBQVUsNkJBQTZCLENBQUMsVUFBa0I7SUFDOUQsT0FBTyxVQUFVLDBCQUFrQyxDQUFDO0FBQ3RELENBQUM7QUFFRCxNQUFNLFVBQVUsMEJBQTBCLENBQUMsVUFBa0I7SUFDM0QsT0FBTyxDQUFDLFVBQVUsd0JBQTRCLENBQUMsc0JBQStCLENBQUM7QUFDakYsQ0FBQztBQUVELE1BQU0sVUFBVSxrQ0FBa0MsQ0FBQyxVQUFrQjtJQUNuRSxPQUFPLFVBQVUsMkJBQW9DLENBQUM7QUFDeEQsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQW1CO0lBQzVDLE1BQU0sRUFBRSxTQUFTO0NBQ2xCLENBQUM7QUFLRjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFtQjtJQUM1QyxNQUFNLEVBQUUsU0FBUztDQUNsQixDQUFDO0FBcVNGLGlGQUFpRjtBQUNqRiwwQkFBMEI7QUFDMUIsTUFBTSxDQUFDLE1BQU0sNkJBQTZCLEdBQUcsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7U2FuaXRpemVyRm59IGZyb20gJy4vc2FuaXRpemF0aW9uJztcblxuLyoqXG4gKiBgSTE4bk11dGF0ZU9wQ29kZWAgZGVmaW5lcyBPcENvZGVzIGZvciBgSTE4bk11dGF0ZU9wQ29kZXNgIGFycmF5LlxuICpcbiAqIE9wQ29kZXMgYXJlIGVmZmljaWVudCBvcGVyYXRpb25zIHdoaWNoIGNhbiBiZSBhcHBsaWVkIHRvIHRoZSBET00gdG8gdXBkYXRlIGl0LiAoRm9yIGV4YW1wbGUgdG9cbiAqIHVwZGF0ZSB0byBhIG5ldyBJQ1UgY2FzZSByZXF1aXJlcyB0aGF0IHdlIGNsZWFuIHVwIHByZXZpb3VzIGVsZW1lbnRzIGFuZCBjcmVhdGUgbmV3IG9uZXMuKVxuICpcbiAqIE9wQ29kZXMgY29udGFpbiB0aHJlZSBwYXJ0czpcbiAqICAxKSBQYXJlbnQgbm9kZSBpbmRleCBvZmZzZXQuIChwKVxuICogIDIpIFJlZmVyZW5jZSBub2RlIGluZGV4IG9mZnNldC4gKHIpXG4gKiAgMykgVGhlIGluc3RydWN0aW9uIHRvIGV4ZWN1dGUuIChpKVxuICpcbiAqIHBwcHAgcHBwcCBwcHBwIHBwcHAgcnJyciBycnJyIHJycnIgcmlpaVxuICogMzMyMiAyMjIyIDIyMjIgMTExMSAxMTExIDExMTAgMDAwMCAwMDAwXG4gKiAxMDk4IDc2NTQgMzIxMCA5ODc2IDU0MzIgMTA5OCA3NjU0IDMyMTBcbiAqXG4gKiBgYGBcbiAqIHZhciBwYXJlbnQgPSBsVmlld1tvcENvZGUgPj4+IFNISUZUX1BBUkVOVF07XG4gKiB2YXIgcmVmTm9kZSA9IGxWaWV3Wygob3BDb2RlICYgTUFTS19SRUYpID4+PiBTSElGVF9SRUYpXTtcbiAqIHZhciBpbnN0cnVjdGlvbiA9IG9wQ29kZSAmIE1BU0tfT1BDT0RFO1xuICogYGBgXG4gKlxuICogU2VlOiBgSTE4bkNyZWF0ZU9wQ29kZXNgIGZvciBleGFtcGxlIG9mIHVzYWdlLlxuICovXG5leHBvcnQgY29uc3QgZW51bSBJMThuTXV0YXRlT3BDb2RlIHtcbiAgLyoqXG4gICAqIFN0b3JlcyBzaGlmdCBhbW91bnQgZm9yIGJpdHMgMTctMyB0aGF0IGNvbnRhaW4gcmVmZXJlbmNlIGluZGV4LlxuICAgKi9cbiAgU0hJRlRfUkVGID0gMyxcbiAgLyoqXG4gICAqIFN0b3JlcyBzaGlmdCBhbW91bnQgZm9yIGJpdHMgMzEtMTcgdGhhdCBjb250YWluIHBhcmVudCBpbmRleC5cbiAgICovXG4gIFNISUZUX1BBUkVOVCA9IDE3LFxuICAvKipcbiAgICogTWFzayBmb3IgT3BDb2RlXG4gICAqL1xuICBNQVNLX0lOU1RSVUNUSU9OID0gMGIxMTEsXG5cbiAgLyoqXG4gICAqIE1hc2sgZm9yIHRoZSBSZWZlcmVuY2Ugbm9kZSAoYml0cyAxNi0zKVxuICAgKi9cbiAgLy8gRklYTUUobWlza28pOiBXaHkgaXMgdGhpcyBub3QgdXNlZD9cbiAgTUFTS19SRUYgPSAwYjExMTExMTExMTExMTExMDAwLFxuICAvLyAgICAgICAgICAgMTExMTExMTAwMDAwMDAwMDBcbiAgLy8gICAgICAgICAgIDY1NDMyMTA5ODc2NTQzMjEwXG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uIHRvIHNlbGVjdCBhIG5vZGUuIChuZXh0IE9wQ29kZSB3aWxsIGNvbnRhaW4gdGhlIG9wZXJhdGlvbi4pXG4gICAqL1xuICBTZWxlY3QgPSAwYjAwMCxcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb24gdG8gYXBwZW5kIHRoZSBjdXJyZW50IG5vZGUgdG8gYFBBUkVOVGAuXG4gICAqL1xuICBBcHBlbmRDaGlsZCA9IDBiMDAxLFxuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbiB0byByZW1vdmUgdGhlIGBSRUZgIG5vZGUgZnJvbSBgUEFSRU5UYC5cbiAgICovXG4gIFJlbW92ZSA9IDBiMDExLFxuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbiB0byBzZXQgdGhlIGF0dHJpYnV0ZSBvZiBhIG5vZGUuXG4gICAqL1xuICBBdHRyID0gMGIxMDAsXG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uIHRvIHNpbXVsYXRlIGVsZW1lbnRFbmQoKVxuICAgKi9cbiAgRWxlbWVudEVuZCA9IDBiMTAxLFxuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbiB0byByZW1vdmVkIHRoZSBuZXN0ZWQgSUNVLlxuICAgKi9cbiAgUmVtb3ZlTmVzdGVkSWN1ID0gMGIxMTAsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJlbnRGcm9tSTE4bk11dGF0ZU9wQ29kZShtZXJnZWRDb2RlOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gbWVyZ2VkQ29kZSA+Pj4gSTE4bk11dGF0ZU9wQ29kZS5TSElGVF9QQVJFTlQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWZGcm9tSTE4bk11dGF0ZU9wQ29kZShtZXJnZWRDb2RlOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gKG1lcmdlZENvZGUgJiBJMThuTXV0YXRlT3BDb2RlLk1BU0tfUkVGKSA+Pj4gSTE4bk11dGF0ZU9wQ29kZS5TSElGVF9SRUY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnN0cnVjdGlvbkZyb21JMThuTXV0YXRlT3BDb2RlKG1lcmdlZENvZGU6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBtZXJnZWRDb2RlICYgSTE4bk11dGF0ZU9wQ29kZS5NQVNLX0lOU1RSVUNUSU9OO1xufVxuXG4vKipcbiAqIE1hcmtzIHRoYXQgdGhlIG5leHQgc3RyaW5nIGlzIGFuIGVsZW1lbnQgbmFtZS5cbiAqXG4gKiBTZWUgYEkxOG5NdXRhdGVPcENvZGVzYCBkb2N1bWVudGF0aW9uLlxuICovXG5leHBvcnQgY29uc3QgRUxFTUVOVF9NQVJLRVI6IEVMRU1FTlRfTUFSS0VSID0ge1xuICBtYXJrZXI6ICdlbGVtZW50J1xufTtcbmV4cG9ydCBpbnRlcmZhY2UgRUxFTUVOVF9NQVJLRVIge1xuICBtYXJrZXI6ICdlbGVtZW50Jztcbn1cblxuLyoqXG4gKiBNYXJrcyB0aGF0IHRoZSBuZXh0IHN0cmluZyBpcyBjb21tZW50IHRleHQuXG4gKlxuICogU2VlIGBJMThuTXV0YXRlT3BDb2Rlc2AgZG9jdW1lbnRhdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IENPTU1FTlRfTUFSS0VSOiBDT01NRU5UX01BUktFUiA9IHtcbiAgbWFya2VyOiAnY29tbWVudCdcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ09NTUVOVF9NQVJLRVIge1xuICBtYXJrZXI6ICdjb21tZW50Jztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJMThuRGVidWcge1xuICAvKipcbiAgICogSHVtYW4gcmVhZGFibGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIE9wQ29kZSBhcnJheXMuXG4gICAqXG4gICAqIE5PVEU6IFRoaXMgcHJvcGVydHkgb25seSBleGlzdHMgaWYgYG5nRGV2TW9kZWAgaXMgc2V0IHRvIGB0cnVlYCBhbmQgaXQgaXMgbm90IHByZXNlbnQgaW5cbiAgICogcHJvZHVjdGlvbi4gSXRzIHByZXNlbmNlIGlzIHB1cmVseSB0byBoZWxwIGRlYnVnIGlzc3VlIGluIGRldmVsb3BtZW50LCBhbmQgc2hvdWxkIG5vdCBiZSByZWxpZWRcbiAgICogb24gaW4gcHJvZHVjdGlvbiBhcHBsaWNhdGlvbi5cbiAgICovXG4gIGRlYnVnPzogc3RyaW5nW107XG59XG5cblxuLyoqXG4gKiBBcnJheSBzdG9yaW5nIE9wQ29kZSBmb3IgZHluYW1pY2FsbHkgY3JlYXRpbmcgYGkxOG5gIGJsb2Nrcy5cbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHNcbiAqIDxJMThuQ3JlYXRlT3BDb2RlPltcbiAqICAgLy8gRm9yIGFkZGluZyB0ZXh0IG5vZGVzXG4gKiAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAvLyBFcXVpdmFsZW50IHRvOlxuICogICAvLyAgIGxWaWV3WzFdLmFwcGVuZENoaWxkKGxWaWV3WzBdID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ3h5eicpKTtcbiAqICAgJ3h5eicsIDAsIDEgPDwgU0hJRlRfUEFSRU5UIHwgMCA8PCBTSElGVF9SRUYgfCBBcHBlbmRDaGlsZCxcbiAqXG4gKiAgIC8vIEZvciBhZGRpbmcgZWxlbWVudCBub2Rlc1xuICogICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICAgLy8gRXF1aXZhbGVudCB0bzpcbiAqICAgLy8gICBsVmlld1sxXS5hcHBlbmRDaGlsZChsVmlld1swXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAqICAgRUxFTUVOVF9NQVJLRVIsICdkaXYnLCAwLCAxIDw8IFNISUZUX1BBUkVOVCB8IDAgPDwgU0hJRlRfUkVGIHwgQXBwZW5kQ2hpbGQsXG4gKlxuICogICAvLyBGb3IgYWRkaW5nIGNvbW1lbnQgbm9kZXNcbiAqICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgIC8vIEVxdWl2YWxlbnQgdG86XG4gKiAgIC8vICAgbFZpZXdbMV0uYXBwZW5kQ2hpbGQobFZpZXdbMF0gPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCcnKSk7XG4gKiAgIENPTU1FTlRfTUFSS0VSLCAnJywgMCwgMSA8PCBTSElGVF9QQVJFTlQgfCAwIDw8IFNISUZUX1JFRiB8IEFwcGVuZENoaWxkLFxuICpcbiAqICAgLy8gRm9yIG1vdmluZyBleGlzdGluZyBub2RlcyB0byBhIGRpZmZlcmVudCBsb2NhdGlvblxuICogICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAvLyBFcXVpdmFsZW50IHRvOlxuICogICAvLyAgIGNvbnN0IG5vZGUgPSBsVmlld1sxXTtcbiAqICAgLy8gICBsVmlld1syXS5hcHBlbmRDaGlsZChub2RlKTtcbiAqICAgMSA8PCBTSElGVF9SRUYgfCBTZWxlY3QsIDIgPDwgU0hJRlRfUEFSRU5UIHwgMCA8PCBTSElGVF9SRUYgfCBBcHBlbmRDaGlsZCxcbiAqXG4gKiAgIC8vIEZvciByZW1vdmluZyBleGlzdGluZyBub2Rlc1xuICogICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAvLyAgIGNvbnN0IG5vZGUgPSBsVmlld1sxXTtcbiAqICAgLy8gICByZW1vdmVDaGlsZCh0Vmlldy5kYXRhKDEpLCBub2RlLCBsVmlldyk7XG4gKiAgIDEgPDwgU0hJRlRfUkVGIHwgUmVtb3ZlLFxuICpcbiAqICAgLy8gRm9yIHdyaXRpbmcgYXR0cmlidXRlc1xuICogICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAvLyAgIGNvbnN0IG5vZGUgPSBsVmlld1sxXTtcbiAqICAgLy8gICBub2RlLnNldEF0dHJpYnV0ZSgnYXR0cicsICd2YWx1ZScpO1xuICogICAxIDw8IFNISUZUX1JFRiB8IEF0dHIsICdhdHRyJywgJ3ZhbHVlJ1xuICogXTtcbiAqIGBgYFxuICpcbiAqIFNlZTogYGFwcGx5STE4bkNyZWF0ZU9wQ29kZXNgO1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEkxOG5NdXRhdGVPcENvZGVzIGV4dGVuZHMgQXJyYXk8bnVtYmVyfHN0cmluZ3xFTEVNRU5UX01BUktFUnxDT01NRU5UX01BUktFUnxudWxsPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJMThuRGVidWcge31cblxuZXhwb3J0IGNvbnN0IGVudW0gSTE4blVwZGF0ZU9wQ29kZSB7XG4gIC8qKlxuICAgKiBTdG9yZXMgc2hpZnQgYW1vdW50IGZvciBiaXRzIDE3LTIgdGhhdCBjb250YWluIHJlZmVyZW5jZSBpbmRleC5cbiAgICovXG4gIFNISUZUX1JFRiA9IDIsXG4gIC8qKlxuICAgKiBNYXNrIGZvciBPcENvZGVcbiAgICovXG4gIE1BU0tfT1BDT0RFID0gMGIxMSxcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb24gdG8gdXBkYXRlIGEgdGV4dCBub2RlLlxuICAgKi9cbiAgVGV4dCA9IDBiMDAsXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbiB0byB1cGRhdGUgYSBhdHRyaWJ1dGUgb2YgYSBub2RlLlxuICAgKi9cbiAgQXR0ciA9IDBiMDEsXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbiB0byBzd2l0Y2ggdGhlIGN1cnJlbnQgSUNVIGNhc2UuXG4gICAqL1xuICBJY3VTd2l0Y2ggPSAwYjEwLFxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb24gdG8gdXBkYXRlIHRoZSBjdXJyZW50IElDVSBjYXNlLlxuICAgKi9cbiAgSWN1VXBkYXRlID0gMGIxMSxcbn1cblxuLyoqXG4gKiBTdG9yZXMgRE9NIG9wZXJhdGlvbnMgd2hpY2ggbmVlZCB0byBiZSBhcHBsaWVkIHRvIHVwZGF0ZSBET00gcmVuZGVyIHRyZWUgZHVlIHRvIGNoYW5nZXMgaW5cbiAqIGV4cHJlc3Npb25zLlxuICpcbiAqIFRoZSBiYXNpYyBpZGVhIGlzIHRoYXQgYGkxOG5FeHBgIE9wQ29kZXMgY2FwdHVyZSBleHByZXNzaW9uIGNoYW5nZXMgYW5kIHVwZGF0ZSBhIGNoYW5nZVxuICogbWFzayBiaXQuIChCaXQgMSBmb3IgZXhwcmVzc2lvbiAxLCBiaXQgMiBmb3IgZXhwcmVzc2lvbiAyIGV0Yy4uLiwgYml0IDMyIGZvciBleHByZXNzaW9uIDMyIGFuZFxuICogaGlnaGVyLikgVGhlIE9wQ29kZXMgdGhlbiBjb21wYXJlIGl0cyBvd24gY2hhbmdlIG1hc2sgYWdhaW5zdCB0aGUgZXhwcmVzc2lvbiBjaGFuZ2UgbWFzayB0b1xuICogZGV0ZXJtaW5lIGlmIHRoZSBPcENvZGVzIHNob3VsZCBleGVjdXRlLlxuICpcbiAqIE5PVEU6IDMybmQgYml0IGlzIHNwZWNpYWwgYXMgaXQgc2F5cyAzMm5kIG9yIGhpZ2hlci4gVGhpcyB3YXkgaWYgd2UgaGF2ZSBtb3JlIHRoYW4gMzIgYmluZGluZ3NcbiAqIHRoZSBjb2RlIHN0aWxsIHdvcmtzLCBidXQgd2l0aCBsb3dlciBlZmZpY2llbmN5LiAoaXQgaXMgdW5saWtlbHkgdGhhdCBhIHRyYW5zbGF0aW9uIHdvdWxkIGhhdmVcbiAqIG1vcmUgdGhhbiAzMiBiaW5kaW5ncy4pXG4gKlxuICogVGhlc2UgT3BDb2RlcyBjYW4gYmUgdXNlZCBieSBib3RoIHRoZSBpMThuIGJsb2NrIGFzIHdlbGwgYXMgSUNVIHN1Yi1ibG9jay5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKlxuICogQXNzdW1lXG4gKiBgYGB0c1xuICogICBpZiAocmYgJiBSZW5kZXJGbGFncy5VcGRhdGUpIHtcbiAqICAgIGkxOG5FeHAoY3R4LmV4cDEpOyAvLyBJZiBjaGFuZ2VkIHNldCBtYXNrIGJpdCAxXG4gKiAgICBpMThuRXhwKGN0eC5leHAyKTsgLy8gSWYgY2hhbmdlZCBzZXQgbWFzayBiaXQgMlxuICogICAgaTE4bkV4cChjdHguZXhwMyk7IC8vIElmIGNoYW5nZWQgc2V0IG1hc2sgYml0IDNcbiAqICAgIGkxOG5FeHAoY3R4LmV4cDQpOyAvLyBJZiBjaGFuZ2VkIHNldCBtYXNrIGJpdCA0XG4gKiAgICBpMThuQXBwbHkoMCk7ICAgICAgICAgICAgLy8gQXBwbHkgYWxsIGNoYW5nZXMgYnkgZXhlY3V0aW5nIHRoZSBPcENvZGVzLlxuICogIH1cbiAqIGBgYFxuICogV2UgY2FuIGFzc3VtZSB0aGF0IGVhY2ggY2FsbCB0byBgaTE4bkV4cGAgc2V0cyBhbiBpbnRlcm5hbCBgY2hhbmdlTWFza2AgYml0IGRlcGVuZGluZyBvbiB0aGVcbiAqIGluZGV4IG9mIGBpMThuRXhwYC5cbiAqXG4gKiAjIyMgT3BDb2Rlc1xuICogYGBgdHNcbiAqIDxJMThuVXBkYXRlT3BDb2Rlcz5bXG4gKiAgIC8vIFRoZSBmb2xsb3dpbmcgT3BDb2RlcyByZXByZXNlbnQ6IGA8ZGl2IGkxOG4tdGl0bGU9XCJwcmV7e2V4cDF9fWlue3tleHAyfX1wb3N0XCI+YFxuICogICAvLyBJZiBgY2hhbmdlTWFzayAmIDBiMTFgXG4gKiAgIC8vICAgICAgICBoYXMgY2hhbmdlZCB0aGVuIGV4ZWN1dGUgdXBkYXRlIE9wQ29kZXMuXG4gKiAgIC8vICAgICAgICBoYXMgTk9UIGNoYW5nZWQgdGhlbiBza2lwIGA4YCB2YWx1ZXMgYW5kIHN0YXJ0IHByb2Nlc3NpbmcgbmV4dCBPcENvZGVzLlxuICogICAwYjExLCA4LFxuICogICAvLyBDb25jYXRlbmF0ZSBgbmV3VmFsdWUgPSAncHJlJytsVmlld1tiaW5kSW5kZXgtNF0rJ2luJytsVmlld1tiaW5kSW5kZXgtM10rJ3Bvc3QnO2AuXG4gKiAgICdwcmUnLCAtNCwgJ2luJywgLTMsICdwb3N0JyxcbiAqICAgLy8gVXBkYXRlIGF0dHJpYnV0ZTogYGVsZW1lbnRBdHRyaWJ1dGUoMSwgJ3RpdGxlJywgc2FuaXRpemVyRm4obmV3VmFsdWUpKTtgXG4gKiAgIDEgPDwgU0hJRlRfUkVGIHwgQXR0ciwgJ3RpdGxlJywgc2FuaXRpemVyRm4sXG4gKlxuICogICAvLyBUaGUgZm9sbG93aW5nIE9wQ29kZXMgcmVwcmVzZW50OiBgPGRpdiBpMThuPkhlbGxvIHt7ZXhwM319IVwiPmBcbiAqICAgLy8gSWYgYGNoYW5nZU1hc2sgJiAwYjEwMGBcbiAqICAgLy8gICAgICAgIGhhcyBjaGFuZ2VkIHRoZW4gZXhlY3V0ZSB1cGRhdGUgT3BDb2Rlcy5cbiAqICAgLy8gICAgICAgIGhhcyBOT1QgY2hhbmdlZCB0aGVuIHNraXAgYDRgIHZhbHVlcyBhbmQgc3RhcnQgcHJvY2Vzc2luZyBuZXh0IE9wQ29kZXMuXG4gKiAgIDBiMTAwLCA0LFxuICogICAvLyBDb25jYXRlbmF0ZSBgbmV3VmFsdWUgPSAnSGVsbG8gJyArIGxWaWV3W2JpbmRJbmRleCAtMl0gKyAnISc7YC5cbiAqICAgJ0hlbGxvICcsIC0yLCAnIScsXG4gKiAgIC8vIFVwZGF0ZSB0ZXh0OiBgbFZpZXdbMV0udGV4dENvbnRlbnQgPSBuZXdWYWx1ZTtgXG4gKiAgIDEgPDwgU0hJRlRfUkVGIHwgVGV4dCxcbiAqXG4gKiAgIC8vIFRoZSBmb2xsb3dpbmcgT3BDb2RlcyByZXByZXNlbnQ6IGA8ZGl2IGkxOG4+e2V4cDQsIHBsdXJhbCwgLi4uIH1cIj5gXG4gKiAgIC8vIElmIGBjaGFuZ2VNYXNrICYgMGIxMDAwYFxuICogICAvLyAgICAgICAgaGFzIGNoYW5nZWQgdGhlbiBleGVjdXRlIHVwZGF0ZSBPcENvZGVzLlxuICogICAvLyAgICAgICAgaGFzIE5PVCBjaGFuZ2VkIHRoZW4gc2tpcCBgMmAgdmFsdWVzIGFuZCBzdGFydCBwcm9jZXNzaW5nIG5leHQgT3BDb2Rlcy5cbiAqICAgMGIxMDAwLCAyLFxuICogICAvLyBDb25jYXRlbmF0ZSBgbmV3VmFsdWUgPSBsVmlld1tiaW5kSW5kZXggLTFdO2AuXG4gKiAgIC0xLFxuICogICAvLyBTd2l0Y2ggSUNVOiBgaWN1U3dpdGNoQ2FzZShsVmlld1sxXSwgMCwgbmV3VmFsdWUpO2BcbiAqICAgMCA8PCBTSElGVF9JQ1UgfCAxIDw8IFNISUZUX1JFRiB8IEljdVN3aXRjaCxcbiAqXG4gKiAgIC8vIE5vdGUgYGNoYW5nZU1hc2sgJiAtMWAgaXMgYWx3YXlzIHRydWUsIHNvIHRoZSBJY3VVcGRhdGUgd2lsbCBhbHdheXMgZXhlY3V0ZS5cbiAqICAgLTEsIDEsXG4gKiAgIC8vIFVwZGF0ZSBJQ1U6IGBpY3VVcGRhdGVDYXNlKGxWaWV3WzFdLCAwKTtgXG4gKiAgIDAgPDwgU0hJRlRfSUNVIHwgMSA8PCBTSElGVF9SRUYgfCBJY3VVcGRhdGUsXG4gKlxuICogXTtcbiAqIGBgYFxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJMThuVXBkYXRlT3BDb2RlcyBleHRlbmRzIEFycmF5PHN0cmluZ3xudW1iZXJ8U2FuaXRpemVyRm58bnVsbD4sIEkxOG5EZWJ1ZyB7fVxuXG4vKipcbiAqIFN0b3JlIGluZm9ybWF0aW9uIGZvciB0aGUgaTE4biB0cmFuc2xhdGlvbiBibG9jay5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUSTE4biB7XG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygc2xvdHMgdG8gYWxsb2NhdGUgaW4gZXhwYW5kby5cbiAgICpcbiAgICogVGhpcyBpcyB0aGUgbWF4IG51bWJlciBvZiBET00gZWxlbWVudHMgd2hpY2ggd2lsbCBiZSBjcmVhdGVkIGJ5IHRoaXMgaTE4biArIElDVSBibG9ja3MuIFdoZW5cbiAgICogdGhlIERPTSBlbGVtZW50cyBhcmUgYmVpbmcgY3JlYXRlZCB0aGV5IGFyZSBzdG9yZWQgaW4gdGhlIEVYUEFORE8sIHNvIHRoYXQgdXBkYXRlIE9wQ29kZXMgY2FuXG4gICAqIHdyaXRlIGludG8gdGhlbS5cbiAgICovXG4gIHZhcnM6IG51bWJlcjtcblxuICAvKipcbiAgICogQSBzZXQgb2YgT3BDb2RlcyB3aGljaCB3aWxsIGNyZWF0ZSB0aGUgVGV4dCBOb2RlcyBhbmQgSUNVIGFuY2hvcnMgZm9yIHRoZSB0cmFuc2xhdGlvbiBibG9ja3MuXG4gICAqXG4gICAqIE5PVEU6IFRoZSBJQ1UgYW5jaG9ycyBhcmUgZmlsbGVkIGluIHdpdGggSUNVIFVwZGF0ZSBPcENvZGUuXG4gICAqL1xuICBjcmVhdGU6IEkxOG5NdXRhdGVPcENvZGVzO1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBPcENvZGVzIHdoaWNoIHdpbGwgYmUgZXhlY3V0ZWQgb24gZWFjaCBjaGFuZ2UgZGV0ZWN0aW9uIHRvIGRldGVybWluZSBpZiBhbnkgY2hhbmdlcyB0b1xuICAgKiBET00gYXJlIHJlcXVpcmVkLlxuICAgKi9cbiAgdXBkYXRlOiBJMThuVXBkYXRlT3BDb2RlcztcblxuICAvKipcbiAgICogQSBsaXN0IG9mIElDVXMgaW4gYSB0cmFuc2xhdGlvbiBibG9jayAob3IgYG51bGxgIGlmIGJsb2NrIGhhcyBubyBJQ1VzKS5cbiAgICpcbiAgICogRXhhbXBsZTpcbiAgICogR2l2ZW46IGA8ZGl2IGkxOG4+WW91IGhhdmUge2NvdW50LCBwbHVyYWwsIC4uLn0gYW5kIHtzdGF0ZSwgc3dpdGNoLCAuLi59PC9kaXY+YFxuICAgKiBUaGVyZSB3b3VsZCBiZSAyIElDVXMgaW4gdGhpcyBhcnJheS5cbiAgICogICAxLiBge2NvdW50LCBwbHVyYWwsIC4uLn1gXG4gICAqICAgMi4gYHtzdGF0ZSwgc3dpdGNoLCAuLi59YFxuICAgKi9cbiAgaWN1czogVEljdVtdfG51bGw7XG59XG5cbi8qKlxuICogRGVmaW5lcyB0aGUgSUNVIHR5cGUgb2YgYHNlbGVjdGAgb3IgYHBsdXJhbGBcbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gSWN1VHlwZSB7XG4gIHNlbGVjdCA9IDAsXG4gIHBsdXJhbCA9IDEsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVEljdSB7XG4gIC8qKlxuICAgKiBEZWZpbmVzIHRoZSBJQ1UgdHlwZSBvZiBgc2VsZWN0YCBvciBgcGx1cmFsYFxuICAgKi9cbiAgdHlwZTogSWN1VHlwZTtcblxuICAvKipcbiAgICogTnVtYmVyIG9mIHNsb3RzIHRvIGFsbG9jYXRlIGluIGV4cGFuZG8gZm9yIGVhY2ggY2FzZS5cbiAgICpcbiAgICogVGhpcyBpcyB0aGUgbWF4IG51bWJlciBvZiBET00gZWxlbWVudHMgd2hpY2ggd2lsbCBiZSBjcmVhdGVkIGJ5IHRoaXMgaTE4biArIElDVSBibG9ja3MuIFdoZW5cbiAgICogdGhlIERPTSBlbGVtZW50cyBhcmUgYmVpbmcgY3JlYXRlZCB0aGV5IGFyZSBzdG9yZWQgaW4gdGhlIEVYUEFORE8sIHNvIHRoYXQgdXBkYXRlIE9wQ29kZXMgY2FuXG4gICAqIHdyaXRlIGludG8gdGhlbS5cbiAgICovXG4gIHZhcnM6IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50bHkgc2VsZWN0ZWQgSUNVIGNhc2UgcG9pbnRlci5cbiAgICpcbiAgICogYGxWaWV3W2N1cnJlbnRDYXNlTFZpZXdJbmRleF1gIHN0b3JlcyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGNhc2UuIFRoaXMgaXMgbmVlZGVkIHRvIGtub3cgaG93XG4gICAqIHRvIGNsZWFuIHVwIHRoZSBjdXJyZW50IGNhc2Ugd2hlbiB0cmFuc2l0aW9uaW5nIG5vIHRoZSBuZXcgY2FzZS5cbiAgICovXG4gIGN1cnJlbnRDYXNlTFZpZXdJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBhcnJheSBvZiBjaGlsZC9zdWIgSUNVcy5cbiAgICpcbiAgICogSW4gY2FzZSBvZiBuZXN0ZWQgSUNVcyBzdWNoIGFzOlxuICAgKiBgYGBcbiAgICoge++/vTDvv70sIHBsdXJhbCxcbiAgICogICA9MCB7emVyb31cbiAgICogICBvdGhlciB777+9MO+/vSB777+9Me+/vSwgc2VsZWN0LFxuICAgKiAgICAgICAgICAgICAgICAgICAgIGNhdCB7Y2F0c31cbiAgICogICAgICAgICAgICAgICAgICAgICBkb2cge2RvZ3N9XG4gICAqICAgICAgICAgICAgICAgICAgICAgb3RoZXIge2FuaW1hbHN9XG4gICAqICAgICAgICAgICAgICAgICAgIH0hXG4gICAqICAgfVxuICAgKiB9XG4gICAqIGBgYFxuICAgKiBXaGVuIHRoZSBwYXJlbnQgSUNVIGlzIGNoYW5naW5nIGl0IG11c3QgY2xlYW4gdXAgY2hpbGQgSUNVcyBhcyB3ZWxsLiBGb3IgdGhpcyByZWFzb24gaXQgbmVlZHNcbiAgICogdG8ga25vdyB3aGljaCBjaGlsZCBJQ1VzIHRvIHJ1biBjbGVhbiB1cCBmb3IgYXMgd2VsbC5cbiAgICpcbiAgICogSW4gdGhlIGFib3ZlIGV4YW1wbGUgdGhpcyB3b3VsZCBiZTpcbiAgICogYGBgdHNcbiAgICogW1xuICAgKiAgIFtdLCAgIC8vIGA9MGAgaGFzIG5vIHN1YiBJQ1VzXG4gICAqICAgWzFdLCAgLy8gYG90aGVyYCBoYXMgb25lIHN1YklDVSBhdCBgMWBzdCBpbmRleC5cbiAgICogXVxuICAgKiBgYGBcbiAgICpcbiAgICogVGhlIHJlYXNvbiB3aHkgaXQgaXMgQXJyYXkgb2YgQXJyYXlzIGlzIGJlY2F1c2UgZmlyc3QgYXJyYXkgcmVwcmVzZW50cyB0aGUgY2FzZSwgYW5kIHNlY29uZFxuICAgKiByZXByZXNlbnRzIHRoZSBjaGlsZCBJQ1VzIHRvIGNsZWFuIHVwLiBUaGVyZSBtYXkgYmUgbW9yZSB0aGFuIG9uZSBjaGlsZCBJQ1VzIHBlciBjYXNlLlxuICAgKi9cbiAgY2hpbGRJY3VzOiBudW1iZXJbXVtdO1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgY2FzZSB2YWx1ZXMgd2hpY2ggdGhlIGN1cnJlbnQgSUNVIHdpbGwgdHJ5IHRvIG1hdGNoLlxuICAgKlxuICAgKiBUaGUgbGFzdCB2YWx1ZSBpcyBgb3RoZXJgXG4gICAqL1xuICBjYXNlczogYW55W107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIE9wQ29kZXMgdG8gYXBwbHkgaW4gb3JkZXIgdG8gYnVpbGQgdXAgdGhlIERPTSByZW5kZXIgdHJlZSBmb3IgdGhlIElDVVxuICAgKi9cbiAgY3JlYXRlOiBJMThuTXV0YXRlT3BDb2Rlc1tdO1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBPcENvZGVzIHRvIGFwcGx5IGluIG9yZGVyIHRvIGRlc3Ryb3kgdGhlIERPTSByZW5kZXIgdHJlZSBmb3IgdGhlIElDVS5cbiAgICovXG4gIHJlbW92ZTogSTE4bk11dGF0ZU9wQ29kZXNbXTtcblxuICAvKipcbiAgICogQSBzZXQgb2YgT3BDb2RlcyB0byBhcHBseSBpbiBvcmRlciB0byB1cGRhdGUgdGhlIERPTSByZW5kZXIgdHJlZSBmb3IgdGhlIElDVSBiaW5kaW5ncy5cbiAgICovXG4gIHVwZGF0ZTogSTE4blVwZGF0ZU9wQ29kZXNbXTtcbn1cblxuLy8gTm90ZTogVGhpcyBoYWNrIGlzIG5lY2Vzc2FyeSBzbyB3ZSBkb24ndCBlcnJvbmVvdXNseSBnZXQgYSBjaXJjdWxhciBkZXBlbmRlbmN5XG4vLyBmYWlsdXJlIGJhc2VkIG9uIHR5cGVzLlxuZXhwb3J0IGNvbnN0IHVudXNlZFZhbHVlRXhwb3J0VG9QbGFjYXRlQWpkID0gMTtcblxuZXhwb3J0IGludGVyZmFjZSBJY3VFeHByZXNzaW9uIHtcbiAgdHlwZTogSWN1VHlwZTtcbiAgbWFpbkJpbmRpbmc6IG51bWJlcjtcbiAgY2FzZXM6IHN0cmluZ1tdO1xuICB2YWx1ZXM6IChzdHJpbmd8SWN1RXhwcmVzc2lvbilbXVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEljdUNhc2Uge1xuICAvKipcbiAgICogTnVtYmVyIG9mIHNsb3RzIHRvIGFsbG9jYXRlIGluIGV4cGFuZG8gZm9yIHRoaXMgY2FzZS5cbiAgICpcbiAgICogVGhpcyBpcyB0aGUgbWF4IG51bWJlciBvZiBET00gZWxlbWVudHMgd2hpY2ggd2lsbCBiZSBjcmVhdGVkIGJ5IHRoaXMgaTE4biArIElDVSBibG9ja3MuIFdoZW5cbiAgICogdGhlIERPTSBlbGVtZW50cyBhcmUgYmVpbmcgY3JlYXRlZCB0aGV5IGFyZSBzdG9yZWQgaW4gdGhlIEVYUEFORE8sIHNvIHRoYXQgdXBkYXRlIE9wQ29kZXMgY2FuXG4gICAqIHdyaXRlIGludG8gdGhlbS5cbiAgICovXG4gIHZhcnM6IG51bWJlcjtcblxuICAvKipcbiAgICogQW4gb3B0aW9uYWwgYXJyYXkgb2YgY2hpbGQvc3ViIElDVXMuXG4gICAqL1xuICBjaGlsZEljdXM6IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBPcENvZGVzIHRvIGFwcGx5IGluIG9yZGVyIHRvIGJ1aWxkIHVwIHRoZSBET00gcmVuZGVyIHRyZWUgZm9yIHRoZSBJQ1VcbiAgICovXG4gIGNyZWF0ZTogSTE4bk11dGF0ZU9wQ29kZXM7XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIE9wQ29kZXMgdG8gYXBwbHkgaW4gb3JkZXIgdG8gZGVzdHJveSB0aGUgRE9NIHJlbmRlciB0cmVlIGZvciB0aGUgSUNVLlxuICAgKi9cbiAgcmVtb3ZlOiBJMThuTXV0YXRlT3BDb2RlcztcblxuICAvKipcbiAgICogQSBzZXQgb2YgT3BDb2RlcyB0byBhcHBseSBpbiBvcmRlciB0byB1cGRhdGUgdGhlIERPTSByZW5kZXIgdHJlZSBmb3IgdGhlIElDVSBiaW5kaW5ncy5cbiAgICovXG4gIHVwZGF0ZTogSTE4blVwZGF0ZU9wQ29kZXM7XG59XG4iXX0=