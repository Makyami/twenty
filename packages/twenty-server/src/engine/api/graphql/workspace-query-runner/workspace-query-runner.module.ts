import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkspaceQueryBuilderModule } from 'src/engine/api/graphql/workspace-query-builder/workspace-query-builder.module';
import { workspaceQueryRunnerFactories } from 'src/engine/api/graphql/workspace-query-runner/factories';
import { TelemetryListener } from 'src/engine/api/graphql/workspace-query-runner/listeners/telemetry.listener';
import { WorkspaceQueryHookModule } from 'src/engine/api/graphql/workspace-query-runner/workspace-query-hook/workspace-query-hook.module';
import { AuditModule } from 'src/engine/core-modules/audit/audit.module';
import { AuthModule } from 'src/engine/core-modules/auth/auth.module';
import { FeatureFlag } from 'src/engine/core-modules/feature-flag/feature-flag.entity';
import { FeatureFlagModule } from 'src/engine/core-modules/feature-flag/feature-flag.module';
import { FileModule } from 'src/engine/core-modules/file/file.module';
import { RecordPositionModule } from 'src/engine/core-modules/record-position/record-position.module';
import { RecordTransformerModule } from 'src/engine/core-modules/record-transformer/record-transformer.module';
import { TelemetryModule } from 'src/engine/core-modules/telemetry/telemetry.module';
import { WorkspaceDataSourceModule } from 'src/engine/workspace-datasource/workspace-datasource.module';

import { EntityEventsToDbListener } from './listeners/entity-events-to-db.listener';

@Module({
  imports: [
    AuthModule,
    WorkspaceQueryBuilderModule,
    WorkspaceDataSourceModule,
    WorkspaceQueryHookModule,
    TypeOrmModule.forFeature([FeatureFlag], 'core'),
    AuditModule,
    TelemetryModule,
    FileModule,
    FeatureFlagModule,
    RecordTransformerModule,
    RecordPositionModule,
  ],
  providers: [
    ...workspaceQueryRunnerFactories,
    EntityEventsToDbListener,
    TelemetryListener,
  ],
  exports: [...workspaceQueryRunnerFactories],
})
export class WorkspaceQueryRunnerModule {}
