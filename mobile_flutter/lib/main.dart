import 'package:flutter/material.dart';
import 'theme/sds_light_theme.dart';
import 'widgets/sahkar_button.dart';

void main() {
  runApp(const SangvyaApp());
}

class SangvyaApp extends StatelessWidget {
  const SangvyaApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SANGVYA Role-Based ERP',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: SdsLightTheme.bgCanvas,
        fontFamily: 'Inter',
      ),
      home: const Role1ApexAdminScreen(),
    );
  }
}

class Role1ApexAdminScreen extends StatelessWidget {
  const Role1ApexAdminScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        title: const Text(
          'SANGVYA Apex Admin (Role 1)',
          style: TextStyle(color: SdsLightTheme.textPrimary, fontWeight: FontWeight.bold, fontSize: 16),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.security, color: SdsLightTheme.emeraldSuccess),
            onPressed: () {},
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: SdsLightTheme.radiusLg,
                border: Border.all(color: SdsLightTheme.borderSubtle),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFEF3C7),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: const Text(
                      'ROLE 1 • APEX GOVERNANCE',
                      style: TextStyle(color: Color(0xFF78350F), fontWeight: FontWeight.bold, fontSize: 10),
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Apex Multi-Tenant Governance (20 NCCT Units)',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: SdsLightTheme.textPrimary),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Manages VAMNICOM Pune, 5 Regional Institutes (RICMs), 14 Institutes (ICMs), and Junior Cooperative Training Centers.',
                    style: TextStyle(fontSize: 12, color: SdsLightTheme.textMuted),
                  ),
                  const SizedBox(height: 16),
                  SahkarButton(
                    label: 'Accredit New Institution',
                    isSaffron: true,
                    icon: Icons.add_business,
                    onPressed: () {},
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
