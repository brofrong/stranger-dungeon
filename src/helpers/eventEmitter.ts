export class EventEmitter {
  public events: Record<string, ((params?: any) => void)[]> = {};

  constructor() {}

  on(name: string, listener: (params?: any) => void) {
    if (!this.events[name]) {
      this.events[name] = [];
    }

    this.events[name].push(listener);
  }

  removeListener(name: string, listenerToRemove: (params?: any) => void) {
    if (!this.events[name]) {
      return console.error(
        `Can't remove a listener. Event "${name}" doesn't exits.`
      );
    }

    const filterListeners = (listener: (params?: any) => void) =>
      listener !== listenerToRemove;

    this.events[name] = this.events[name].filter(filterListeners);
  }

  emit(name: string, data: any) {
    this.events[name]?.forEach((callback) => callback(data));
  }
}
