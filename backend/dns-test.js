import dns from "node:dns/promises";

try {
  const result = await dns.resolveSrv(
    "_mongodb._tcp.crud-3.wimgbxk.mongodb.net"
  );

  console.log(result);
} catch (err) {
  console.error(err);
}