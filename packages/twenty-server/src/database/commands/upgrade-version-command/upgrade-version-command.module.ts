import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { V0_43_UpgradeVersionCommandModule } from 'src/database/commands/upgrade-version-command/0-43/0-43-upgrade-version-command.module';
import { V0_44_UpgradeVersionCommandModule } from 'src/database/commands/upgrade-version-command/0-44/0-44-upgrade-version-command.module';
import { V0_50_UpgradeVersionCommandModule } from 'src/database/commands/upgrade-version-command/0-50/0-50-upgrade-version-command.module';
import { V0_51_UpgradeVersionCommandModule } from 'src/database/commands/upgrade-version-command/0-51/0-51-upgrade-version-command.module';
import { V0_52_UpgradeVersionCommandModule } from 'src/database/commands/upgrade-version-command/0-52/0-52-upgrade-version-command.module';
import { V0_53_UpgradeVersionCommandModule } from 'src/database/commands/upgrade-version-command/0-53/0-53-upgrade-version-command.module';
import { V0_54_UpgradeVersionCommandModule } from 'src/database/commands/upgrade-version-command/0-54/0-54-upgrade-version-command.module';
import { V0_55_UpgradeVersionCommandModule } from 'src/database/commands/upgrade-version-command/0-55/0-55-upgrade-version-command.module';
import {
  DatabaseMigrationService,
  UpgradeCommand,
} from 'src/database/commands/upgrade-version-command/upgrade.command';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { WorkspaceSyncMetadataModule } from 'src/engine/workspace-manager/workspace-sync-metadata/workspace-sync-metadata.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace], 'core'),
    V0_43_UpgradeVersionCommandModule,
    V0_44_UpgradeVersionCommandModule,
    V0_50_UpgradeVersionCommandModule,
    V0_51_UpgradeVersionCommandModule,
    V0_52_UpgradeVersionCommandModule,
    V0_53_UpgradeVersionCommandModule,
    V0_54_UpgradeVersionCommandModule,
    V0_55_UpgradeVersionCommandModule,
    WorkspaceSyncMetadataModule,
  ],
  providers: [DatabaseMigrationService, UpgradeCommand],
})
export class UpgradeVersionCommandModule {}
