# Server SDKs

All nine expose the same control-plane surface. Server-side only: they take a `key_…` API key.
Never ship them in a browser or mobile app.

```
createStream · getStream · listStreams · refreshStream
disablePeers · enablePeers · getMetrics · sendTelemetry
```

`disablePeers` → `POST /kill`; `enablePeers` → `POST /revive`.

## Install status

Registry publication is pending. Use the GitHub installs below; the source is public in each
repository. Do not claim an npm/PyPI/Packagist/Maven/NuGet/crates/Hex package is live until it
is.

| Language | Repository | Install |
| --- | --- | --- |
| Node.js | `Seedess/node-sdk` | `npm install github:Seedess/node-sdk` |
| Python | `Seedess/python-sdk` | `pip install git+https://github.com/Seedess/python-sdk` |
| Go | `Seedess/go-sdk` | `go get github.com/Seedess/go-sdk` |
| PHP | `Seedess/php-sdk` | Composer VCS repository (Packagist pending) |
| Java | `Seedess/java-sdk` | build from source (Maven pending) |
| Ruby | `Seedess/ruby-sdk` | `gem 'seedess-sdk', git: 'https://github.com/Seedess/ruby-sdk'` |
| .NET | `Seedess/dotnet-sdk` | project reference (NuGet pending) |
| Rust | `Seedess/rust-sdk` | `seedess-sdk = { git = "https://github.com/Seedess/rust-sdk" }` |
| Elixir | `Seedess/elixir-sdk` | `{:seedess_sdk, git: "https://github.com/Seedess/elixir-sdk"}` |

## Examples

### Node.js

```js
import { Seedess } from '@seedess/node-sdk';

const seedess = new Seedess(process.env.SEEDESS_API_KEY);
const stream = await seedess.createStream({
  url: 'https://origin.example/master.m3u8',
  id: 'demo',
});
console.log(stream.publicToken, stream.playback.master);
```

### Python

```python
import os
from seedess_sdk import Seedess

seedess = Seedess(os.environ["SEEDESS_API_KEY"])
stream = seedess.create_stream("https://origin.example/master.m3u8", id="demo")
print(stream["publicToken"], stream["playback"]["master"])
```

### Go

```go
client := seedess.New(os.Getenv("SEEDESS_API_KEY"))
stream, err := client.CreateStream(ctx, seedess.CreateStreamInput{
    URL: "https://origin.example/master.m3u8",
    ID:  "demo",
})
fmt.Println(stream.PublicToken, stream.Playback.Master)
```

### PHP

```php
$seedess = new Seedess\Client(getenv('SEEDESS_API_KEY'));
$stream = $seedess->createStream([
    'url' => 'https://origin.example/master.m3u8',
    'id'  => 'demo',
]);
echo $stream['publicToken'];
```

### Java

```java
SeedessClient seedess = new SeedessClient(System.getenv("SEEDESS_API_KEY"));
Stream stream = seedess.createStream(
    new CreateStreamInput("https://origin.example/master.m3u8", "demo", null, null));
System.out.println(stream.publicToken());
```

### Ruby

```ruby
seedess = Seedess::Client.new(ENV.fetch('SEEDESS_API_KEY'))
stream = seedess.create_stream(url: 'https://origin.example/master.m3u8', id: 'demo')
puts stream['publicToken']
```

### .NET

```csharp
var seedess = new SeedessClient(Environment.GetEnvironmentVariable("SEEDESS_API_KEY")!);
var stream = await seedess.CreateStreamAsync(new CreateStreamInput(
    "https://origin.example/master.m3u8", Id: "demo"));
Console.WriteLine(stream.PublicToken);
```

### Rust

```rust
let client = seedess_sdk::Client::new(std::env::var("SEEDESS_API_KEY")?)?;
let mut input = seedess_sdk::CreateStreamInput::new("https://origin.example/master.m3u8");
input.id = Some("demo".into());
let stream = client.create_stream(input)?;
println!("{:?}", stream.public_token);
```

### Elixir

```elixir
client = Seedess.new(System.fetch_env!("SEEDESS_API_KEY"))
stream = Seedess.create_stream(client, "https://origin.example/master.m3u8", id: "demo")
IO.puts(stream["publicToken"])
```

## Method casing

| Canonical | Node/JS | Python | Go | PHP | Java/Kotlin | Ruby | .NET | Rust | Elixir |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| createStream | createStream | create_stream | CreateStream | createStream | createStream | create_stream | CreateStreamAsync | create_stream | create_stream |
| getStream | getStream | get_stream | GetStream | getStream | getStream | get_stream | GetStreamAsync | get_stream | get_stream |
| listStreams | listStreams | list_streams | ListStreams | listStreams | listStreams | list_streams | ListStreamsAsync | list_streams | list_streams |
| refreshStream | refreshStream | refresh_stream | RefreshStream | refreshStream | refreshStream | refresh_stream | RefreshStreamAsync | refresh_stream | refresh_stream |
| disablePeers | disablePeers | disable_peers | DisablePeers | disablePeers | disablePeers | disable_peers | DisablePeersAsync | disable_peers | disable_peers |
| enablePeers | enablePeers | enable_peers | EnablePeers | enablePeers | enablePeers | enable_peers | EnablePeersAsync | enable_peers | enable_peers |
| getMetrics | getMetrics | get_metrics | GetMetrics | getMetrics | getMetrics | get_metrics | GetMetricsAsync | get_metrics | get_metrics |
| sendTelemetry | sendTelemetry | send_telemetry | SendTelemetry | sendTelemetry | sendTelemetry | send_telemetry | SendTelemetryAsync | send_telemetry | send_telemetry |

## Raw REST fallback

Any language can call the API directly. See [`api.md`](api.md) and
[`openapi.json`](openapi.json).

```http
POST /api/v1/streams
Authorization: Bearer key_…
Content-Type: application/json

{"url":"https://origin.example/master.m3u8","id":"demo"}
```
