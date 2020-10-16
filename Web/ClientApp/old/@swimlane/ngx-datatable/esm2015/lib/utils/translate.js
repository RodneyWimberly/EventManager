import { getVendorPrefixedName } from './prefixes';
import { camelCase } from './camel-case';
// browser detection and prefixing tools
const transform = typeof window !== 'undefined' ? getVendorPrefixedName('transform') : undefined;
const backfaceVisibility = typeof window !== 'undefined' ? getVendorPrefixedName('backfaceVisibility') : undefined;
const hasCSSTransforms = typeof window !== 'undefined' ? !!getVendorPrefixedName('transform') : undefined;
const hasCSS3DTransforms = typeof window !== 'undefined' ? !!getVendorPrefixedName('perspective') : undefined;
const ua = typeof window !== 'undefined' ? window.navigator.userAgent : 'Chrome';
const isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);
export function translateXY(styles, x, y) {
    if (typeof transform !== 'undefined' && hasCSSTransforms) {
        if (!isSafari && hasCSS3DTransforms) {
            styles[transform] = `translate3d(${x}px, ${y}px, 0)`;
            styles[backfaceVisibility] = 'hidden';
        }
        else {
            styles[camelCase(transform)] = `translate(${x}px, ${y}px)`;
        }
    }
    else {
        styles.top = `${y}px`;
        styles.left = `${x}px`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvdXRpbHMvdHJhbnNsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXpDLHdDQUF3QztBQUN4QyxNQUFNLFNBQVMsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDakcsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUNuSCxNQUFNLGdCQUFnQixHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDMUcsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQzlHLE1BQU0sRUFBRSxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUNqRixNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUU3RCxNQUFNLFVBQVUsV0FBVyxDQUFDLE1BQVcsRUFBRSxDQUFTLEVBQUUsQ0FBUztJQUMzRCxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxnQkFBZ0IsRUFBRTtRQUN4RCxJQUFJLENBQUMsUUFBUSxJQUFJLGtCQUFrQixFQUFFO1lBQ25DLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUNyRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDdkM7YUFBTTtZQUNMLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUM1RDtLQUNGO1NBQU07UUFDTCxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDdEIsTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0tBQ3hCO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFZlbmRvclByZWZpeGVkTmFtZSB9IGZyb20gJy4vcHJlZml4ZXMnO1xuaW1wb3J0IHsgY2FtZWxDYXNlIH0gZnJvbSAnLi9jYW1lbC1jYXNlJztcblxuLy8gYnJvd3NlciBkZXRlY3Rpb24gYW5kIHByZWZpeGluZyB0b29sc1xuY29uc3QgdHJhbnNmb3JtID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBnZXRWZW5kb3JQcmVmaXhlZE5hbWUoJ3RyYW5zZm9ybScpIDogdW5kZWZpbmVkO1xuY29uc3QgYmFja2ZhY2VWaXNpYmlsaXR5ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBnZXRWZW5kb3JQcmVmaXhlZE5hbWUoJ2JhY2tmYWNlVmlzaWJpbGl0eScpIDogdW5kZWZpbmVkO1xuY29uc3QgaGFzQ1NTVHJhbnNmb3JtcyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gISFnZXRWZW5kb3JQcmVmaXhlZE5hbWUoJ3RyYW5zZm9ybScpIDogdW5kZWZpbmVkO1xuY29uc3QgaGFzQ1NTM0RUcmFuc2Zvcm1zID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyAhIWdldFZlbmRvclByZWZpeGVkTmFtZSgncGVyc3BlY3RpdmUnKSA6IHVuZGVmaW5lZDtcbmNvbnN0IHVhID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCA6ICdDaHJvbWUnO1xuY29uc3QgaXNTYWZhcmkgPSAvU2FmYXJpXFwvLy50ZXN0KHVhKSAmJiAhL0Nocm9tZVxcLy8udGVzdCh1YSk7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVYWShzdHlsZXM6IGFueSwgeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgaWYgKHR5cGVvZiB0cmFuc2Zvcm0gIT09ICd1bmRlZmluZWQnICYmIGhhc0NTU1RyYW5zZm9ybXMpIHtcbiAgICBpZiAoIWlzU2FmYXJpICYmIGhhc0NTUzNEVHJhbnNmb3Jtcykge1xuICAgICAgc3R5bGVzW3RyYW5zZm9ybV0gPSBgdHJhbnNsYXRlM2QoJHt4fXB4LCAke3l9cHgsIDApYDtcbiAgICAgIHN0eWxlc1tiYWNrZmFjZVZpc2liaWxpdHldID0gJ2hpZGRlbic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlc1tjYW1lbENhc2UodHJhbnNmb3JtKV0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN0eWxlcy50b3AgPSBgJHt5fXB4YDtcbiAgICBzdHlsZXMubGVmdCA9IGAke3h9cHhgO1xuICB9XG59XG4iXX0=